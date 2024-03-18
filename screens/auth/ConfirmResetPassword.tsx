import {Button, Text} from '@rneui/themed';
import React from 'react';
import {Alert, View} from 'react-native';
import {AuthRoutes, AuthStackScreenProps} from '../../routes/types';
import {SubmitHandler, useForm} from 'react-hook-form';
import AuthWrapper from './components/AuthWrapper';
import LoginInputField from './components/LoginInputField';
import {yupResolver} from '@hookform/resolvers/yup';
import {confirmResetPasswordSchema} from '../../schema/authSchema';
import {ObjectSchema} from 'yup';
import {confirmResetPassword} from 'aws-amplify/auth';

type ConfirmResetPasswordPayload = {
  code: string;
  password: string;
  confirmPassword: string;
};

const ConfirmResetPassword = ({route, navigation}: AuthStackScreenProps) => {
  const {username} = route.params ?? {username: ''};

  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ConfirmResetPasswordPayload>({
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(
      confirmResetPasswordSchema as ObjectSchema<ConfirmResetPasswordPayload>,
    ),
  });

  const submitHandler: SubmitHandler<
    ConfirmResetPasswordPayload
  > = async data => {
    const {code, password} = data;

    try {
      await confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword: password,
      });
      Alert.alert('Success', 'Password reset successful', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate(AuthRoutes.Login);
          },
        },
      ]);
    } catch (error: any) {
      console.log('error', error);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <AuthWrapper>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: '500',
          marginBottom: 20,
        }}>
        AWS Confirm Reset Password
      </Text>
      <LoginInputField
        control={control}
        name="code"
        labelText="Enter Code"
        keyboardType="default"
        error={errors.code?.message}
        placeholder="Enter code from your email"
      />
      <LoginInputField
        control={control}
        name="password"
        labelText="New Password"
        keyboardType="default"
        error={errors.code?.message}
        placeholder="Enter new password"
      />
      <LoginInputField
        control={control}
        name="confirmPassword"
        labelText="Confirm Password"
        keyboardType="default"
        error={errors.code?.message}
        placeholder="Confirm your password"
      />

      <Button title="Submit" onPress={handleSubmit(submitHandler)} />
    </AuthWrapper>
  );
};

export default ConfirmResetPassword;
