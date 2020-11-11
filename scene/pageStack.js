import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Component} from 'react';

import deviceTab from './deviceTab';
import personInfo from './personInfo';

const ps = createStackNavigator();

export default class otherStack extends Component {
  render() {
    return (
      <ps.navigator>
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
      </ps.navigator>
    );
  }
}
