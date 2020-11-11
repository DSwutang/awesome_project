import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class PersonInfo extends Component {
  render() {
    console.log(this.props.route.params);
    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center'}}>OK</Text>
      </View>
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
});
