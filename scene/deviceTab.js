import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import deviceRecord from './deviceRecord';
import devicePerson from './devicePerson';
import {Component} from 'react';

const deviceTab = createBottomTabNavigator();

export default class bottomTab extends Component {
  token = '';
  id = '';
  render() {
    console.log('deviceTab');
    console.log(this.props.route);
    this.token = this.props.route.params.token;
    this.id = this.props.route.params.facility_id;
    return (
      <deviceTab.Navigator>
        <deviceTab.Screen
          name="devicePerson"
          component={devicePerson}
          initialParams={{token: this.token, facility_id: this.id}}
          options={{
            title: '人员',
          }}
        />
        <deviceTab.Screen
          name="deviceRecord"
          component={deviceRecord}
          initialParams={{token: this.token, facility_id: this.id}}
          options={{
            title: '记录',
          }}
        />
      </deviceTab.Navigator>
    );
  }
}
