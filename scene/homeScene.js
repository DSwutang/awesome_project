import React, {Component} from 'react';
import AppCreateNavigator from './bottomTab';
import {Text, View, StyleSheet, Button} from 'react-native';

export default class HomeScene extends Component {
  render() {
    return <AppCreateNavigator />;
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
