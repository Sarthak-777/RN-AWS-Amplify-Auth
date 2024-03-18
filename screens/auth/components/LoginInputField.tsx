import {Text} from '@rneui/base';
import {Input} from '@rneui/themed';
import React from 'react';
import {KeyboardTypeOptions} from 'react-native';
import styles from '../styles';
import {Control, Controller} from 'react-hook-form';
import PasswordInputField from './PasswordInputField';

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
}

type payload = LoginPayload | RegisterPayload;

type inputFieldProps = {
  type?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  labelText: string;
  secureTextEntry?: boolean;
  control: Control<any>;
  name:
    | 'username'
    | 'password'
    | 'email'
    | 'phoneNumber'
    | 'confirmPassword'
    | 'code';
  error?: string;
};

const LoginInputField = ({
  type,
  control,
  keyboardType,
  placeholder,
  labelText,
  secureTextEntry = false,
  name,
  error,
  ...rest
}: inputFieldProps) => {
  return (
    <>
      <Text style={styles.loginLabel}>{labelText}</Text>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            {type === 'password' || type === 'confirmPassword' ? (
              <PasswordInputField
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                rightIcon="remove-red-eye"
                {...rest}
              />
            ) : (
              <Input
                placeholder={placeholder}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputField}
                keyboardType={keyboardType}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                {...rest}
              />
            )}
          </>
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default LoginInputField;
