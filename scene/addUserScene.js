import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  LogBox,
} from 'react-native';
import RNFS from 'react-native-fs';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default class SelfInfoScene extends Component {
  name = '';
  token = '';
  facility_id = '';
  data = '';
  gender = '';
  photoYES = 0;
  calenderText = '请选择出生日期';
  constructor(props) {
    super(props);
    this.state = {
      uri: '',
      show: false,
    };
  }

  nameChanged = (newName) => {
    this.name = newName;
  };

  onUri = (uri) => {
    this.setState(uri);
  };

  regisPhoto = () => {
    const {navigate} = this.props.navigation; //获取navigation的navigate方法
    navigate('photo', {onUri: this.onUri});
    this.photoYES = 1;
    //this.openCamera();
  };

  Photo = () => {
    if (this.photoYES === 1) {
      console.log(this.state.uri);
      return <Image source={this.state.uri} style={{width: 60, height: 60}} />;
    } else {
      return <Image source={require('../icon/add.png')} />;
    }
  };

  add = () => {
    RNFS.readFile(this.state.uri, 'base64')
      .then((content) => {
        this.data = content;
      })
      .then(() => {
        console.log(this.token);
        console.log(this.facility_id);
        console.log(this.gender);
        console.log(this.birthday);
        fetch(
          'https://backend-vegeteam.app.secoder.net/api/mobile/admin/add/',
          {
            method: 'POST',
            body: JSON.stringify({
              user_token: this.token,
              facility_id: this.facility_id,
              name: this.name,
              gender: this.gender,
              birth: this.birthday,
              image: this.data,
            }),
          },
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.code !== 200) console.log('提交失败');
            else Alert.alert('添加', '添加成功');
            const {goBack} = this.props.navigation;
            goBack();
          });
      })
      .catch(() => {
        console.log('图片读取失败');
      });
  };

  selectGender = (index, value) => {
    if (value === '女') {
      this.gender = 'F';
    } else if (value === '男') {
      this.gender = 'M';
    }
  };

  chooseDate = () => {
    this.setState({show: true});
  };

  onChange = (event, date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    this.calenderText =
      year.toString() + '年' + month.toString() + '月' + day.toString() + '日';
    this.birthday =
      year.toString() + '-' + month.toString() + '-' + day.toString();
    this.setState({show: false});
  };

  render() {
    this.token = this.props.route.params.token;
    this.facility_id = this.props.route.params.facility_id;
    console.log(this.token);
    console.log(this.facility_id);
    return (
      <View style={styles.container}>
        <this.Photo />
        <TouchableOpacity onPress={this.regisPhoto} style={styles.button}>
          <Text>提交照片</Text>
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <TextInput
            ref="name"
            onChangeText={this.nameChanged} //添加值改变事件
            style={styles.input}
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //将下划线颜色改为透明
            placeholderTextColor={'#ccc'} //设置占位符颜色
            placeholder={'name'} //设置占位符
          />
        </View>
        <ModalDropdown
          options={['男', '女']} //下拉内容数组
          style={styles.dropdown}
          onSelect={this.selectGender}
          dropdownStyle={[styles.dropdown, {height: 36 * 2}]}
          defaultValue={'男'}
        />

        <TouchableOpacity style={styles.inputBox} onPress={this.chooseDate}>
          <Text>{this.calenderText}</Text>
        </TouchableOpacity>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        )}
        <TouchableOpacity onPress={this.add} style={styles.button}>
          <Text>添加</Text>
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
  input: {
    width: 200,
    height: 40,
    fontSize: 20,
    color: '#000', //输入框输入的文本为白色
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    marginTop: 20,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    marginTop: 20,
  },
  button: {
    height: 50,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#66f',
    marginTop: 10,
  },
  content: {
    fontSize: 40,
  },
});
