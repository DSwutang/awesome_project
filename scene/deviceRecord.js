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

export default class DeviceRecord extends Component {
  constructor(props) {
    super(props);
    // console.log('record');
    // console.log(this.props.route.params);
    this.token = this.props.route.params.token;
    this.deviceID = this.props.route.params.facility_id;
    this.deviceName = this.props.route.params.fa_name;
    this.state = {
      DATA: [],
      isRefreshing: false,
    };
    this.getDATA();
  }
  getDATA = () => {
    // console.log(this.token);
    // console.log(this.deviceID);
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/access/all/',
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
        // console.log(_data.data);
        this.setState({DATA: _data.data, isRefreshing: false});
      })
      .catch(() => {
        // console.log('连接失败');
        Alert.alert('获取信息', '连接异常');
      });
  };
  Item = ({item}) => (
    <View style={styles.item}>
      <View style={styles.item_left}>
        <Text style={styles.title}> {item.commonuser_name}</Text>
        <Text style={styles.content}> {item.datetime}</Text>
      </View>
      <View style={styles.item_right}>
        <Text style={styles.device_title}> {this.deviceName}</Text>
      </View>
    </View>
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
          keyExtractor={(item) => item.commonuser_id.toString()}
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
    backgroundColor: '#33ff99',
    height: 80,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  item_left: {
    width: '60%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item_right: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlignVertical: 'center',
    fontSize: 32,
  },
  device_title: {
    textAlignVertical: 'center',
    fontSize: 20,
  },
  content: {
    fontSize: 20,
  },
});
