import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DeviceManagerScene from './deviceManagerScene';
import PersonManagerScene from './personManagerScene';
import SelfInfoScene from './selfInfo';
import {Component} from 'react';

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
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'lock'} size={32} color={tintColor} />
            ),
          }}
        />
        <Tab.Screen
          name="person"
          component={PersonManagerScene}
          initialParams={{token: this.token}}
          options={{
            title: '人员管理',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'users'} size={26} color={tintColor} />
            ),
          }}
        />
        <Tab.Screen
          name="self"
          component={SelfInfoScene}
          initialParams={{token: this.token}}
          options={{
            title: '个人信息',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'user-circle-o'} size={26} color={tintColor} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
