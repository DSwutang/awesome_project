import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//引入界面文件，并设置引入的类
import HomeScene from './bottomTab';
import LoginScene from './loginScene';
import RegisterScene from './registerScene';
import pageStack from './pageStack';

const Stack = createStackNavigator();

function SimpleApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{gestureEnabled: false}}
        headerMode="none">
        <Stack.Screen name="Login" component={LoginScene} />
        <Stack.Screen
          name="Home"
          component={HomeScene}
          //initialParams={{header: null}}
        />
        <Stack.Screen name="Register" component={RegisterScene} />
        <Stack.Screen name="pageStack" component={pageStack} />
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
