import React from 'react';
import {View} from 'react-native';

const AuthWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 60,
        paddingHorizontal: 30,
      }}>
      {children}
    </View>
  );
};

export default AuthWrapper;
