import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class PersonInfo extends Component {
  constructor(props) {
    super(props);
    this.info = this.props.route.params.info;
    this.state = {
      record: [],
    };
  }
  getDATA = () => {
    fetch('https://backend-vegeteam.app.secoder.net/api/mobile/admin/access/', {
      method: 'POST',
      body: JSON.stringify({
        user_token: this.token,
        facility_id: this.deviceID,
      }),
    })
      .then((response) => response.json())
      .then((_data) => {
        this.setState({record: _data.data});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.info.name}</Text>
        <Text>{this.info.gender}</Text>
        <Text>{this.info.birth}</Text>
        <Text>进出记录</Text>
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
