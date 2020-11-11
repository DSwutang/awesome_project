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
import {SwipeAction} from '@ant-design/react-native';

export default class DeviceRecord extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token;
    this.deviceID = this.props.route.params.facility_id;
    this.state = {
      DATA: [],
    };
    this.getDATA();
  }
  getDATA = () => {
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/commonuser/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
          facility_id: this.deviceID,
        }),
      },
    )
      .then((response) => response.json())
      .then((_data) => {
        console.log(this.token);
        console.log(this.deviceID);
        console.log(_data.commonuser);
        this.setState({DATA: _data.commonuser});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  del = (name, gender, birth, id_c) => {
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/unbindfacility/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
          facility_id: this.deviceID,
          name: name,
          gender: gender,
          birth: birth,
          id_c: id_c,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          Alert.alert('解绑人员', '解绑成功');
        } else {
          Alert.alert('解绑人员', '解绑失败');
        }
        this.getDATA();
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  goInfo = () => {
    const {navigate} = this.props.navigation;
    navigate('personInfo');
  };

  Item = ({name, gender, birth, id_c}) => (
    <SwipeAction
      autoClose
      style={{backgroundColor: 'transparent'}}
      right={[
        {
          text: '删除',
          onPress: () => {
            // 删除逻辑
            this.del(name, gender, birth, id_c);
          },
          style: {backgroundColor: 'red', color: 'white'},
        },
      ]}>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            this.goInfo();
          }}
          style={styles.container}>
          <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
      </View>
    </SwipeAction>
  );
  render() {
    const renderItem = ({item}) => <this.Item name={item.name} />;
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_c.toString()}
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
