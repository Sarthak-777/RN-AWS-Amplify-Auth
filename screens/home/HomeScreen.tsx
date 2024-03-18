import {Text} from '@rneui/themed';
import {signOut} from 'aws-amplify/auth';
import React from 'react';
import {Button, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const handleLogOut = async () => {
    await signOut();
  };
  return (
    <View style={{marginTop: 50}}>
      <Text>HomeScreen</Text>
      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
};

export default HomeScreen;
