import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import LoginInputField from './components/LoginInputField';
import {Button} from '@rneui/themed';
import {AuthRoutes} from '../../routes/types';
import {yupResolver} from '@hookform/resolvers/yup';
import loginSchema from '../../schema/loginSchema';
import {Control, SubmitHandler, useForm} from 'react-hook-form';
import registerSchema from '../../schema/registerSchema';
import {ObjectSchema} from 'yup';
import {signUp} from 'aws-amplify/auth';

interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const SignUp = ({navigation}: any) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterPayload>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(registerSchema as ObjectSchema<RegisterPayload>),
  });

  const submitHandler: SubmitHandler<RegisterPayload> = async data => {
    const {username, password, confirmPassword, phoneNumber} = data;
    try {
      const {isSignUpComplete, nextStep} = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            phone_number: phoneNumber,
          },
          autoSignIn: true,
        },
      });
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        navigation.navigate(AuthRoutes.ConfirmSignUp, {username});
      }
    } catch (error: any) {
      Alert.alert('Error', error.message, [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate(AuthRoutes.Login);
          },
        },
      ]);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 60,
        paddingHorizontal: 30,
      }}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: '500',
          marginBottom: 20,
        }}>
        AWS Amplify Register
      </Text>
      <LoginInputField
        control={control}
        name="username"
        labelText="username"
        keyboardType="default"
        error={errors.username?.message}
        placeholder="Enter your email"
      />
      <LoginInputField
        type="password"
        control={control}
        name="password"
        labelText="Password"
        error={errors.password?.message}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <LoginInputField
        type="password"
        control={control}
        name="confirmPassword"
        labelText="Confirm Password"
        error={errors.confirmPassword?.message}
        placeholder="Confirm your password"
        secureTextEntry={true}
      />
      <LoginInputField
        type="phone"
        control={control}
        name="phoneNumber"
        labelText="Phone Number"
        error={errors.phoneNumber?.message}
        placeholder="Enter your phone number"
      />
      <Button title="Sign Up" onPress={handleSubmit(submitHandler)} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(AuthRoutes.Login);
        }}>
        <Text style={{fontWeight: '500', marginTop: 30, color: 'gray'}}>
          Login Here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
