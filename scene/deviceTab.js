import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import deviceRecord from './deviceRecord';
import devicePerson from './devicePerson';
import {Component} from 'react';

const deviceTab = createBottomTabNavigator();

export default class bottomTab extends Component {
  token = this.props.route.params.token;
  render() {
    return (
      <deviceTab.Navigator>
        <deviceTab.Screen
          name="devicePerson"
          component={devicePerson}
          options={{
            title: '人员',
          }}
        />
        <deviceTab.Screen
          name="deviceRecord"
          component={deviceRecord}
          options={{
            title: '记录',
          }}
        />
      </deviceTab.Navigator>
    );
  }
}
