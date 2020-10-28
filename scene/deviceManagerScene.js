import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';

const DATA = [
  {
    name: '东门',
    id: '1',
  },
  {
    name: '南门',
    id: '2',
  },
  {
    name: '西门',
    id: '3',
  },
  {
    name: '北门',
    id: '4',
  },
];
export default class DeviceManagerScene extends Component {
  token = '';
  input_id = '';

  addUser = (deviceID) => {
    const {navigate} = this.props.navigation;
    navigate('AddUser', {token: this.token, facility_id: deviceID});
  };

  Item = ({name, id}) => (
    <View style={styles.item}>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          this.addUser(id);
        }}>
        <View style={styles.cell}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '80%',
              height: '80%',
              marginTop: '10%',
              marginLeft: '10%',
            }}
            resizeMode="center"
            resizeMethod="resize"
            source={require('../icon/add.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  bind = () => {
    console.log(this.token);
    console.log(this.input_id);
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
          Alert.alert('绑定', '成功绑定' + this.input_id + '号设备');
        } else {
          console.log('绑定失败');
          Alert.alert('绑定', '绑定失败');
        }
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  onID = (ID) => {
    this.input_id = ID;
    this.bind();
  };

  addDevice = () => {
    const {navigate} = this.props.navigation; //获取navigation的navigate方法
    navigate('QR', {onID: this.onID});
  };

  render() {
    //console.log(this.props.route);
    this.token = this.props.route.params.token;

    const renderItem = ({item}) => <this.Item name={item.name} id={item.id} />;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity onPress={this.addDevice} style={styles.button}>
          <Text style={styles.btText}>添加设备</Text>
        </TouchableOpacity>
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
