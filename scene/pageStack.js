import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from 'react';

import deviceTab from './deviceTab';
import personInfo from './personInfo';
import simpleInfo from './simpleInfo';
import AddUserScene from './addUserScene';
import PhotoScene from './photoScene';
import QRphoto from './QRphoto';
const ps = createStackNavigator();

export default class pageStack extends Component {
  render() {
    return (
      <ps.Navigator>
        <ps.Screen
          name="AddUser"
          component={AddUserScene}
          options={{
            headerTitle: '添加用户',
          }}
        />
        <ps.Screen
          name="photo"
          component={PhotoScene}
          options={{
            headerTitle: '照相',
          }}
        />
        <ps.Screen
          name="QR"
          component={QRphoto}
          options={{
            headerTitle: '扫描二维码',
          }}
        />
        <ps.Screen
          name="deviceTab"
          component={deviceTab}
          options={{
            headerTitle: '设备明细',
          }}
        />
        <ps.Screen
          name="personInfo"
          component={personInfo}
          options={{
            headerTitle: '用户信息',
          }}
        />
        <ps.Screen
          name="simpleInfo"
          component={simpleInfo}
          options={{
            headerTitle: '用户信息',
          }}
        />
      </ps.Navigator>
    );
  }
}
