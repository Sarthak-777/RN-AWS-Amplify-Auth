import {Input} from '@rneui/themed';
import React, {useState} from 'react';
import {KeyboardTypeOptions, TouchableOpacity} from 'react-native';
import styles from '../styles';

type passwordInputFieldProps = {
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  secureTextEntry?: boolean;
  rightIcon: string;
  onChange: any;
  onBlur: any;
  value: any;
};

const PasswordInputField = ({
  placeholder,
  keyboardType,
  rightIcon,
  onChange,
  onBlur,
  value,
  ...rest
}: passwordInputFieldProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const secureTextEntryDisable = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
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
  );
};

export default PasswordInputField;
