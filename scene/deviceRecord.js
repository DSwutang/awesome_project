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
    console.log('record');
    console.log(this.props.route.params);
    this.token = this.props.route.params.token;
    this.deviceID = this.props.route.params.facility_id;
    this.state = {
      DATA: [],
      isRefreshing: false,
    };
    this.getDATA();
  }
  getDATA = () => {
    console.log(this.token);
    console.log(this.deviceID);
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
        console.log(_data.data);
        this.setState({DATA: _data.data, isRefreshing: false});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };
  Item = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.commonuser_name}</Text>
      <Text style={styles.content}>{item.datetime}</Text>
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
    backgroundColor: '#f9c2ff',
    height: 80,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    textAlignVertical: 'center',
    fontSize: 32,
  },
  content: {
    fontSize: 20,
  },
});
