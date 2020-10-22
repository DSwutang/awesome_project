import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Alert, TextInput} from 'react-native';

export default class DeviceManagerScene extends Component {
  token = '';
  input_id = '';

  backToLogin = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack(); //返回上一界面
  };

  onIDChanged = (new_ID) => {
    this.input_id = new_ID;
  };

  bind = () => {
    console.log(this.token);
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/bindfacility/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
          facility_id: this.input_id,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          console.log('绑定成功');
          Alert.alert('绑定', '绑定成功');
        } else {
          console.log('绑定失败');
          Alert.alert('绑定', '绑定失败');
        }
      });
  };

  render() {
    //console.log(this.props.route);
    this.token = this.props.route.params.token;
    return (
      <View style={styles.container}>
        <Text style={styles.content}>点击绑定设备</Text>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={this.onIDChanged} //添加值改变事件
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //将下划线颜色改为透明
            placeholderTextColor={'#ccc'} //设置占位符颜色
            placeholder={'设备号'} //设置占位符
            ref="input_id"
          />
        </View>
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
