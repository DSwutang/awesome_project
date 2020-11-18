import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class SelfInfoScene extends Component {
  token = '';
  backToLogin = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack(); //返回上一界面
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.backToLogin} style={styles.button}>
          <Text style={styles.content}>退出登录</Text>
        </TouchableOpacity>
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
  button: {
    marginTop: '140%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  content: {
    fontFamily: 'customFont',
    fontSize: 25,
  },
});
