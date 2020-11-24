import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import deviceRecord from './deviceRecord';
import devicePerson from './devicePerson';
import {Component} from 'react';
import {LogBox} from 'react-native';

const deviceTab = createBottomTabNavigator();
LogBox.ignoreAllLogs();
export default class bottomTab extends Component {
  token = '';
  id = '';
  render() {
    // console.log('deviceTab');
    // console.log(this.props.route);
    this.token = this.props.route.params.token;
    this.id = this.props.route.params.facility_id;
    this.deviceName = this.props.route.params.fa_name;
    return (
      <deviceTab.Navigator>
        <deviceTab.Screen
          name="devicePerson"
          component={devicePerson}
          initialParams={{
            token: this.token,
            facility_id: this.id,
            fa_name: this.deviceName,
          }}
          options={{
            title: '人员',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'user-o'} size={25} color={tintColor} />
            ),
          }}
        />
        <deviceTab.Screen
          name="deviceRecord"
          component={deviceRecord}
          initialParams={{
            token: this.token,
            facility_id: this.id,
            fa_name: this.deviceName,
          }}
          options={{
            title: '记录',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome name={'file-text-o'} size={23} color={tintColor} />
            ),
          }}
        />
      </deviceTab.Navigator>
    );
  }
}
