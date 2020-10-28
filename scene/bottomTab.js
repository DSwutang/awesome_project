import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import PhotoScene from './photoScene';
import DeviceManagerScene from './deviceManagerScene';
import PersonManagerScene from './personManagerScene';
import SelfInfoScene from './selfInfo';
import {Component, Image, Text} from 'react';

function MyTabBar({state, descriptors, navigation}) {}

const Tab = createBottomTabNavigator();

export default class bottomTab extends Component {
  token = this.props.token;
  render() {
    return (
      <Tab.Navigator initialRouteName="device" backBehavior="none">
        <Tab.Screen
          name="device"
          component={DeviceManagerScene}
          initialParams={{token: this.token}}
          options={{
            title: '设备管理',
          }}
        />
        <Tab.Screen
          name="person"
          component={PersonManagerScene}
          initialParams={{token: this.token}}
          options={{
            title: '人员管理',
          }}
        />
        <Tab.Screen
          name="self"
          component={SelfInfoScene}
          initialParams={{token: this.token}}
          options={{
            title: '个人信息',
            //tabBarIcon: () => <Image source={require('../icon/self.png')} />,
          }}
        />
      </Tab.Navigator>
    );
  }
}
