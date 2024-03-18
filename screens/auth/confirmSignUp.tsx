import {Button, Text} from '@rneui/themed';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import LoginInputField from './components/LoginInputField';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import confirmSignupSchema from '../../schema/confirmSignupSchema';
import {ObjectSchema} from 'yup';
import {RouteProp} from '@react-navigation/native';
import {AuthRoutes, AuthStackScreenProps} from '../../routes/types';
import {confirmSignUp, resendSignUpCode} from 'aws-amplify/auth';

type ConfirmPayload = {
  code: string;
};

const ConfirmSignUp = ({route, navigation}: AuthStackScreenProps) => {
  const {username} = route.params ?? {username: ''};

  const submitHandler: SubmitHandler<ConfirmPayload> = async data => {
    const {code} = data;
    try {
      const {isSignUpComplete, nextStep} = await confirmSignUp({
        username,
        confirmationCode: code,
      });
      if (isSignUpComplete) {
        navigation.navigate(AuthRoutes.Login);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleResendVerificationCode = async () => {
    // implement resend verification code
    try {
      const {destination, deliveryMedium, attributeName} =
        await resendSignUpCode({
          username,
        });
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Error', e.message);
      }
    }
  };
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ConfirmPayload>({
    defaultValues: {
      code: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(confirmSignupSchema as ObjectSchema<ConfirmPayload>),
  });
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
        AWS Amplify Confirm Signup
      </Text>
      <LoginInputField
        control={control}
        name="code"
        labelText="Enter Code"
        keyboardType="default"
        error={errors.code?.message}
        placeholder="Enter code from your email"
      />

      <Button title="login" onPress={handleSubmit(submitHandler)} />
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={handleResendVerificationCode}>
        <Text style={{color: 'gray'}}>Resend verification code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmSignUp;
