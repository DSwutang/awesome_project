import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  StatusBar,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

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

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
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

    const renderItem = ({item}) => <Item title={item.name} />;
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
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
