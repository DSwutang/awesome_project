import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import PhotoScene from './photoScene';
import DeviceManagerScene from './deviceManagerScene';
import PersonManagerScene from './personManagerScene';
import SelfInfoScene from './selfInfo';
import {Component} from 'react';

function MyTabBar({state, descriptors, navigation}) {}

const Tab = createBottomTabNavigator();

export default class bottomTab extends Component {
  token = this.props.token;
  render() {
    return (
      <Tab.Navigator initialRouteName="device" backBehavior="none">
        <Tab.Screen
          name="photo"
          component={PhotoScene}
          initialParams={{token: this.token}}
        />
        <Tab.Screen
          name="device"
          component={DeviceManagerScene}
          initialParams={{token: this.token}}
        />
        <Tab.Screen
          name="person"
          component={PersonManagerScene}
          initialParams={{token: this.token}}
        />
        <Tab.Screen
          name="self"
          component={SelfInfoScene}
          initialParams={{token: this.token}}
        />
      </Tab.Navigator>
    );
  }
}
