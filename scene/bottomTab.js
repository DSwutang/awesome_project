import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './router/index';

import PhotoScene from './photoScene';
import DeviceManagerScene from './deviceManagerScene';
import PersonManagerScene from './personManagerScene';
import SelfInfoScene from './selfInfo';

function MyTabBar({state, descriptors, navigation}) {}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      {/* {routes.map((router, index) => (
          <Tab.Screen
            name={router.name}
            component={router.component}
            key={index}
            options={router.options}
          />
        ))} */}
      <Tab.Screen name="photo" component={PhotoScene} />
      <Tab.Screen name="device" component={DeviceManagerScene} />
      <Tab.Screen name="person" component={PersonManagerScene} />
      <Tab.Screen name="self" component={SelfInfoScene} />
    </Tab.Navigator>
  );
}
