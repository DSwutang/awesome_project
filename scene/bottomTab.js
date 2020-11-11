import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DeviceManagerScene from './deviceManagerScene';
import PersonManagerScene from './personManagerScene';
import SelfInfoScene from './selfInfo';
import deviceTab from './deviceTab';
import {Component, TouchableOpacity, Text, Image} from 'react';
import {Button, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack_device = createStackNavigator();
const Stack_person = createStackNavigator();
const Stack_self = createStackNavigator();

function DeviceStack(token) {
  return (
    <Stack_device.Navigator>
      <Stack_device.Screen
        name="device"
        component={DeviceManagerScene}
        initialParams={{token: token}}
        options={{
          headerTitle: '设备管理',
          headerLeft: null,
          headerTitleStyle: {alignSelf: 'center'},
        }}
      />
    </Stack_device.Navigator>
  );
}

function PersonStack(token) {
  return (
    <Stack_person.Navigator>
      <Stack_person.Screen
        name="person"
        component={PersonManagerScene}
        initialParams={{token: token}}
        options={{
          headerTitle: '人员管理',
          headerLeft: null,
          headerTitleStyle: {alignSelf: 'center'},
        }}
      />
    </Stack_person.Navigator>
  );
}

function SelfStack(token) {
  return (
    <Stack_self.Navigator>
      <Stack_self.Screen
        name="self"
        component={SelfInfoScene}
        initialParams={{token: token}}
        options={{
          headerTitle: '个人信息',
          headerLeft: null,
          headerTitleStyle: {alignSelf: 'center'},
        }}
      />
    </Stack_self.Navigator>
  );
}

export default class bottomTab extends Component {
  token = this.props.route.params.token;
  render() {
    return (
      <Tab.Navigator initialRouteName="device" backBehavior="none">
        <Tab.Screen
          name="device"
          component={DeviceStack}
          initialParams={{token: this.token}}
          options={{
            title: '设备管理',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'lock'} size={30} color={tintColor} />
            ),
          }}
        />
        <Tab.Screen
          name="person"
          component={PersonStack}
          initialParams={{token: this.token}}
          options={{
            title: '人员管理',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'users'} size={23} color={tintColor} />
            ),
          }}
        />
        <Tab.Screen
          name="self"
          component={SelfStack}
          initialParams={{token: this.token}}
          options={{
            title: '个人信息',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'user-circle-o'} size={24} color={tintColor} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({});
