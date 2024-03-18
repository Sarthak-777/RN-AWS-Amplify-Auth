import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRoutes, AppStackParamList} from './types';
import HomeScreen from '../screens/home/HomeScreen';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={AppRoutes.Home} component={HomeScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
