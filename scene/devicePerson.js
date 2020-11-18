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
  RefreshControl,
} from 'react-native';
import {SwipeAction} from '@ant-design/react-native';

export default class DeviceRecord extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token;
    this.deviceID = this.props.route.params.facility_id;
    this.state = {
      DATA: [],
      isRefreshing: false,
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
        this.setState({DATA: _data.commonuser, isRefreshing: false});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  del = (item) => {
    console.log(this.token);
    console.log(this.deviceID);
    console.log(item);
    fetch('https://backend-vegeteam.app.secoder.net/api/mobile/admin/delete/', {
      method: 'POST',
      body: JSON.stringify({
        user_token: this.token,
        facility_id: this.deviceID,
        id_c: item.id_c,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

  goInfo = (item) => {
    const {navigate} = this.props.navigation;
    navigate('pageStack', {
      screen: 'personInfo',
      params: {info: item, facility_id: this.deviceID, token: this.token},
    });
  };

  Item = ({item}) => (
    <SwipeAction
      autoClose
      style={{backgroundColor: 'transparent'}}
      right={[
        {
          text: '删除',
          onPress: () => {
            // 删除逻辑
            this.del(item);
          },
          style: {backgroundColor: 'red', color: 'white'},
        },
      ]}>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            this.goInfo(item);
          }}
          style={styles.container}>
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    </SwipeAction>
  );

  _onRefresh() {
    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        this.getDATA();
      },
    );
  }

  render() {
    const {isRefreshing} = this.state || {};
    const renderItem = ({item}) => <this.Item item={item} />;
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_c.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              colors={['#ff0000', '#00ff00', '#0000ff']}
              tintColor={'#fff'}
              progressBackgroundColor={'#ffffff'}
              onRefresh={() => {
                this._onRefresh();
              }}
            />
          }
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
    height: 40,
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
