import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthRoutes, AuthStackParamList} from './types';
import {
  ConfirmSignUp,
  ForgotPassword,
  SignIn,
  SignUp,
  ConfirmResetPassword,
} from '../screens/auth';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{}}>
      <AuthStack.Screen name={AuthRoutes.Login} component={SignIn} />

      <AuthStack.Screen name={AuthRoutes.Register} component={SignUp} />
      <AuthStack.Screen
        name={AuthRoutes.ConfirmSignUp}
        component={ConfirmSignUp}
      />
      <AuthStack.Screen
        name={AuthRoutes.ForgotPassword}
        component={ForgotPassword}
      />
      <AuthStack.Screen
        name={AuthRoutes.ConfirmResetPassword}
        component={ConfirmResetPassword}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
