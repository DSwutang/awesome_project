import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

export default class DeviceManagerScene extends Component {
  token = '';

  backToLogin = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack(); //返回上一界面
  };

  bind = () => {
    console.log(this.token);
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/bindfacility/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
          facility_id: 2,
        }),
      },
    ).then((code) => {
      if (code === 200) {
        console.log('绑定成功');
      } else {
        console.log('绑定失败');
      }
    });
  };

  render() {
    //console.log(this.props.route);
    this.token = this.props.route.params.token;
    return (
      <View style={styles.container}>
        <Text style={styles.content}>点击绑定设备</Text>
        <Button onPress={this.bind} style={styles.button} title="绑定设备" />
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
  content: {
    fontSize: 40,
  },
});
