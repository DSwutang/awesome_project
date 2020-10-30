import React, {Component} from 'react';
import AppCreateNavigator from './bottomTab';
import {Text, View, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DeviceManagerScene from './deviceManagerScene';
import PersonManagerScene from './personManagerScene';
import SelfInfoScene from './selfInfo';

const homeStack = createStackNavigator();

export default class HomeScene extends Component {
  token = this.props.route.params.token;
  render() {
    return (
      <homeStack.Navigator>
        <homeStack.Screen name="device" component={DeviceManagerScene} />
        <homeStack.Screen name="person" component={PersonManagerScene} />
        <homeStack.Screen name="self" component={SelfInfoScene} />
      </homeStack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    fontSize: 40,
  },
});
