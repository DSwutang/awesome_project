import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Dimensions} from 'react-native';
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
    marginTop: Dimensions.get('window').height * 0.75,
    height: Dimensions.get('window').height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3366',
  },
  content: {
    fontFamily: 'customFont',
    fontSize: 25,
  },
});
