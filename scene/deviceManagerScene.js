import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    name: '东门',
    id: 1,
  },
  {
    name: '南门',
    id: 2,
  },
  {
    name: '西门',
    id: 3,
  },
  {
    name: '北门',
    id: 4,
  },
];
const Item = ({name}) => (
  <View style={styles.item}>
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
    </View>
    <TouchableOpacity>
      <View style={styles.cell}>
        <Text>HERE</Text>
      </View>
    </TouchableOpacity>
  </View>
);
export default class DeviceManagerScene extends Component {
  token = '';
  input_id = '';
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

    const renderItem = ({item}) => <Item name={item.name} />;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cell: {
    width: 80,
    height: '100%',
    backgroundColor: '#fefefe',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    height: 80,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    textAlignVertical: 'center',
    fontSize: 32,
  },
});
