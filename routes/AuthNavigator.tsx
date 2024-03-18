import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthRoutes, AuthStackParamList} from './types';
import SignIn from '../screens/auth/signin';
import signup from '../screens/auth/signup';
import ConfirmSignUp from '../screens/auth/confirmSignUp';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{}}>
      <AuthStack.Screen name={AuthRoutes.Login} component={SignIn} />

      <AuthStack.Screen name={AuthRoutes.Register} component={signup} />
      <AuthStack.Screen
        name={AuthRoutes.ConfirmSignUp}
        component={ConfirmSignUp}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
