import {Button, Text} from '@rneui/themed';
import React from 'react';
import LoginInputField from './components/LoginInputField';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ObjectSchema} from 'yup';
import {forgotPasswordSchema} from '../../schema/authSchema';
import AuthWrapper from './components/AuthWrapper';
import {ResetPasswordOutput, resetPassword} from 'aws-amplify/auth';
import {Alert} from 'react-native';
import {AuthRoutes} from '../../routes/types';

type ForgotPasswordPayload = {
  email: string;
};

const ForgotPassword = ({navigation}: any) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordPayload>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(
      forgotPasswordSchema as ObjectSchema<ForgotPasswordPayload>,
    ),
  });

  const submitHandler: SubmitHandler<ForgotPasswordPayload> = async data => {
    const {email} = data;
    try {
      const output = await resetPassword({username: email});
      handleResetPasswordNextSteps({output, email});
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Error', e.message);
      }
    }
  };

  const handleResetPasswordNextSteps = async ({
    output,
    email,
  }: {
    output: ResetPasswordOutput;
    email: string;
  }) => {
    const {nextStep} = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        Alert.alert('Success', 'Reset code sent to your email', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate(AuthRoutes.ConfirmResetPassword, {
                username: email,
              });
            },
          },
        ]);
        break;
      default:
        // navigate to login screen
        break;
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
        AWS Amplify Confirm Signup
      </Text>
      <LoginInputField
        control={control}
        name="email"
        labelText="Enter Email"
        keyboardType="default"
        error={errors.email?.message}
        placeholder="Enter your email"
      />

      <Button title="Submit" onPress={handleSubmit(submitHandler)} />
    </AuthWrapper>
  );
};

export default ForgotPassword;
