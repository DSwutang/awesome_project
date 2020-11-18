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
  LogBox,
} from 'react-native';
import {SwipeAction} from '@ant-design/react-native';

LogBox.ignoreLogs([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
  'Warning: componentWillUpdate is deprecated',
  'componentWillMount has been renamed, and is not recommended for use.',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use.',
]);

export default class DeviceManagerScene extends Component {
  token = '';
  input_id = '';

  constructor(props) {
    super(props);
    this.token = this.props.route.params.token.route.params.token;
    this.state = {
      DATA: [],
    };
    this.getDATA();
  }

  getDATA = () => {
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/facility/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({DATA: data.facility});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  del = (deviceID) => {
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/unbindfacility/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
          facility_id: deviceID,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          Alert.alert('删除设备', '删除成功');
        } else {
          Alert.alert('删除设备', '删除失败');
        }
        this.getDATA();
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  addUser = (deviceID) => {
    const {navigate} = this.props.navigation;
    navigate('AddUser', {token: this.token, facility_id: deviceID});
  };

  openInfo = (deviceID) => {
    const {navigate} = this.props.navigation;
    navigate('pageStack', {
      screen: 'deviceTab',
      params: {token: this.token, facility_id: deviceID},
    });
  };

  Item = ({name, id}) => (
    <SwipeAction
      autoClose
      style={{backgroundColor: 'transparent'}}
      right={[
        {
          text: '删除',
          onPress: () => {
            // 删除逻辑
            this.del(id);
          },
          style: {backgroundColor: 'red', color: 'white'},
        },
      ]}>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            this.openInfo(id);
          }}
          style={styles.container}>
          <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
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
    </SwipeAction>
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
        this.getDATA();
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

  refresh = () => {
    this.getDATA();
  };

  render() {
    //console.log(this.props.route);
    console.log(this.token);

    const renderItem = ({item}) => (
      <this.Item name={item.location} id={item.id_f} />
    );
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_f.toString()}
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
    alignSelf: 'center',
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
