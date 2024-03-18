/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Amplify} from 'aws-amplify';
import {AuthUser, getCurrentUser} from 'aws-amplify/auth';

import AuthNavigator from './routes/AuthNavigator';
import AppNavigator from './routes/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Hub} from 'aws-amplify/utils';
import config from './lib/aws-exports';

Amplify.configure(config);

function App(): React.JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null);

  const getCurrentAuthenticatedUser = async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentAuthenticatedUser();
  }, []);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({payload}) => {
      switch (payload.event) {
        case 'signedIn':
          getCurrentAuthenticatedUser();
          break;
        case 'signedOut':
          setUser(null);
          break;
      }
    });
    return () => unsubscribe();
  });

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        {user ? <AppNavigator /> : <AuthNavigator />}
        {/* <AppNavigator /> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
