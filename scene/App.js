/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//引入三个界面文件，并设置引入的类
import HomeScene from './homeScene';
import LoginScene from './loginScene';
import RegisterScene from './registerScene';

const Stack = createStackNavigator();

function SimpleApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{gestureEnabled: true}}>
        <Stack.Screen
          name="Login"
          component={LoginScene}
          options={{headerTitle: <Text>登陆</Text>}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScene}
          initialParams={{header: null}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScene}
          options={{headerTitle: <Text>注册</Text>}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

// export default App
