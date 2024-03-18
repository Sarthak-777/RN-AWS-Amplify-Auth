import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import loginSchema from '../../schema/loginSchema';
import {ObjectSchema} from 'yup';
import {Alert, TouchableOpacity, View} from 'react-native';
import LoginInputField from './components/LoginInputField';
import {Button, Text} from '@rneui/themed';
import {signIn} from 'aws-amplify/auth';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes, AuthRoutes, AuthStackScreenProps} from '../../routes/types';

interface LoginPayload {
  username: string;
  password: string;
}

interface SignInProps {
  navigation: any;
}

const SignIn = ({navigation}: any) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(loginSchema as ObjectSchema<LoginPayload>),
  });

  const submitHandler: SubmitHandler<LoginPayload> = async data => {
    const {username, password} = data;
    try {
      const {nextStep, isSignedIn} = await signIn({username, password});
      if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        navigation.navigate(AuthRoutes.ConfirmSignUp, {username});
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
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
        AWS Amplify Login
      </Text>
      <LoginInputField
        control={control}
        name="username"
        labelText="username"
        keyboardType="default"
        error={errors.username?.message}
        placeholder="Enter your username"
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
      <Button title="login" onPress={handleSubmit(submitHandler)} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(AuthRoutes.Register);
        }}>
        <Text style={{fontWeight: '500', marginTop: 30, color: 'gray'}}>
          Register Here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
