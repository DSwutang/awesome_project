import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

export default class SelfInfoScene extends Component {
  token = '';
  backToLogin = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack(); //返回上一界面
  };

  render() {
    this.token = this.props.route.params.token.route.params.token;
    return (
      <View style={styles.container}>
        <Text style={styles.content}>登录成功!这是主页4!</Text>
        <Button
          onPress={this.backToLogin}
          style={styles.button}
          title="点击返回登陆"
        />
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
