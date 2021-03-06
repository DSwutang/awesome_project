import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  StatusBar,
} from 'react-native';

function LoginFetch(username, password) {
  return fetch(
    'https://backend-vegeteam.app.secoder.net/api/mobile/admin/login/',
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
        return {token: data.token, val: 1};
      } else {
        return {token: data.token, val: 0};
      }
    })
    .catch((error) => {
      console.warn(error);
    });
}

export default class LoginScene extends Component {
  username = ''; //保存用户名
  password = ''; //保存密码
  token = '';

  blurTextInput = () => {
    this.refs.username.blur();
    this.refs.password.blur();
  };

  /**
   * 当用户名输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的用户名]
   */
  onUsernameChanged = (newUsername) => {
    // console.log(newUsername); //运行后可以在输入框随意输入内容并且查看log验证！
    this.username = newUsername;
  };

  /**
   * 当密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的密码]
   */
  onPasswordChanged = (newPassword) => {
    // console.log(newPassword); //运行后可以在输入框随意输入内容并且查看log验证！
    this.password = newPassword;
  };
  /**
   * 登陆按钮，点击时验证输入的用户名和密码是否正确，正确时进入主页面，否则弹出提示
   */
  login = () => {
    LoginFetch(this.username, this.password).then((data) => {
      if (data.val === 1) {
        this.refs.username.blur();
        this.refs.password.blur();
        this.token = data.token;
        const {navigate} = this.props.navigation; //获取navigation的navigate方法
        navigate('Home', {token: this.token}); //跳转到注册过的Home界面
      } else {
        this.password = '';
        Alert.alert('登陆失败', '用户名或密码不正确'); //弹出提示框
      }
    });
  };

  /**
   * 注册按钮，点击进入注册界面
   */
  register = () => {
    const {navigate} = this.props.navigation; //获取navigation的navigate方法
    navigate('Register'); //跳转到注册过的Register界面
  };
  render() {
    return (
      <TouchableOpacity //用可点击的组件作为背景
        activeOpacity={1.0} //设置背景被点击时的透明度改变值
        onPress={this.blurTextInput} //添加点击事件
        style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={this.onUsernameChanged} //添加值改变事件
            style={styles.input}
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //将下划线颜色改为透明
            placeholderTextColor={'#ccc'} //设置占位符颜色
            placeholder={'username'} //设置占位符
            ref="username"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={this.onPasswordChanged} //添加值改变事件
            style={styles.input}
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //将下划线颜色改为透明
            secureTextEntry={true} //设置为密码输入框
            placeholderTextColor={'#ccc'} //设置占位符颜色
            placeholder={'password'} //设置占位符
            ref="password"
          />
        </View>
        <TouchableOpacity onPress={this.login} style={styles.button}>
          <Text style={styles.btText}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.register} style={styles.button}>
          <Text style={styles.btText}>注册</Text>
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
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#58812F',
    marginBottom: 8,
  },
  button: {
    height: 50,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#58812F',
    marginTop: 20,
  },
  btText: {
    color: '#fff',
    fontSize: 20,
  },
});
