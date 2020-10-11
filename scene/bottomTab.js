import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  CreateBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import routes from './router/index';

function MyTabBar({state, descriptors, navigation}) {}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        {routes.map((router, index) => (
          <Tab.Screen
            name={router.name}
            component={router.component}
            key={index}
            options={router.options}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
