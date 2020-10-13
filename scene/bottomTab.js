import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import PhotoScene from './photoScene';
import DeviceManagerScene from './deviceManagerScene';
import PersonManagerScene from './personManagerScene';
import SelfInfoScene from './selfInfo';

function MyTabBar({state, descriptors, navigation}) {}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="photo" component={PhotoScene} />
      <Tab.Screen name="device" component={DeviceManagerScene} />
      <Tab.Screen name="person" component={PersonManagerScene} />
      <Tab.Screen name="self" component={SelfInfoScene} />
    </Tab.Navigator>
  );
}
