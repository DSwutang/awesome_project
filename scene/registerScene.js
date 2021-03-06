/* eslint-disable react/no-string-refs */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
} from 'react-native';

function RegisterFetch(username, password) {
  return fetch(
    'https://backend-vegeteam.app.secoder.net/api/mobile/admin/regis/',
    {
      method: 'POST',
      body: JSON.stringify({
        user_name: username,
        user_pwd: password,
      }),
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        return 1;
      } else {
        return 0;
      }
    })
    .catch((error) => {
      console.warn(error);
    });
}

export default class RegisterScene extends Component {
  username = ''; //保存用户名
  password = ''; //保存密码
  confirmPassword = ''; //保存确认密码

  /**
   * 当用户名输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的用户名]
   */
  onUsernameChanged = (newUsername) => {
    //console.log(newUsername);//运行后可以在输入框随意输入内容并且查看log验证！
    this.username = newUsername;
  };

  /**
   * 当密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的密码]
   */
  onPasswordChanged = (newPassword) => {
    //console.log(newPassword);//运行后可以在输入框随意输入内容并且查看log验证！
    this.password = newPassword;
  };

  /**
   * 当确认密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的确认密码]
   */
  onConfirmPasswordChanged = (newConfirmPassword) => {
    //console.log(newConfirmPassword); //运行后可以在输入框随意输入内容并且查看log验证！
    this.confirmPassword = newConfirmPassword;
  };
  /**
   * 注册按钮，根据输入的内容判断注册是否成功
   */
  register = () => {
    if (
      this.username !== '' &&
      this.password !== '' &&
      this.password.length >= 6
    ) {
      if (this.password === this.confirmPassword) {
        RegisterFetch(this.username, this.password).then((val) => {
          if (val === 1) {
            const {goBack} = this.props.navigation; //获取navigation的goBack方法
            Alert.alert('注册成功', '返回登陆', [
              {
                text: '确定',
                onPress: () => {
                  goBack();
                },
              },
            ]); //给弹出的提示框添加事件
          } else {
            Alert.alert('注册失败', '用户名重复！');
          }
        });
      } else {
        Alert.alert('注册失败', '密码与确认密码不同');
      }
    } else {
      Alert.alert('注册失败', '用户名或密码不能为空，且密码长度不少于6位');
    }
  };

  back = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack();
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1.0} //设置背景被点击时，透明度不变
        style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            ref="username"
            onChangeText={this.onUsernameChanged} //添加值改变事件
            style={styles.input}
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //将下划线颜色改为透明
            placeholderTextColor={'#ccc'} //设置占位符颜色
            placeholder={'username'} //设置占位符
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            ref="password"
            onChangeText={this.onPasswordChanged} //添加值改变事件
            style={styles.input}
            secureTextEntry={true} //设置为密码输入框
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //将下划线颜色改为透明
            placeholderTextColor={'#ccc'} //设置占位符颜色
            placeholder={'password'} //设置占位符
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            ref="confirmPassword"
            onChangeText={this.onConfirmPasswordChanged} //添加值改变事件
            style={styles.input}
            secureTextEntry={true} //设置为密码输入框
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //将下划线颜色改为透明
            placeholderTextColor={'#ccc'} //设置占位符颜色
            placeholder={'confirm password'} //设置占位符
          />
        </View>
        <TouchableOpacity onPress={this.register} style={styles.button}>
          <Text style={styles.btText}>注册</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.back} style={styles.button}>
          <Text style={styles.btText}>返回登陆</Text>
        </TouchableOpacity>
      </TouchableOpacity>
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
  input: {
    width: 200,
    height: 40,
    fontSize: 20,
    color: '#fff', //输入框输入的文本为白色
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#66f',
    marginBottom: 8,
    padding: 0,
  },
  button: {
    height: 50,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#66f',
    marginTop: 20,
  },
  btText: {
    color: '#fff',
    fontSize: 20,
  },
});
