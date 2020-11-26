import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';
export default class PersonInfo extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token;
    this.info = this.props.route.params.info;
    this.deviceID = this.props.route.params.facility_id;
    this.deviceName = this.props.route.params.fa_name;
    // console.log(this.props.route);
    this.state = {
      DATA: [],
      isRefreshing: false,
    };
    this.getDATA();
  }
  decodeDate = (date_str) => {
    const date = new Date(date_str.replace(/-/g, '/') + ' UTC');
    let da = '';
    da += date.getFullYear() + '-';
    da += date.getMonth() + '-';
    da += date.getDate() + ' ';
    da += date.getHours() + ':';
    da += date.getMinutes() + ':';
    da += date.getSeconds();
    return da;
  };
  getDATA = () => {
    // console.log(this.info);
    // console.log('debug');
    fetch('https://backend-vegeteam.app.secoder.net/api/mobile/admin/access/', {
      method: 'POST',
      body: JSON.stringify({
        user_token: this.token,
        facility_id: this.deviceID,
        commonuser_name: this.info.name,
      }),
    })
      .then((response) => response.json())
      .then((_data) => {
        let data_all = _data.data;
        let data_input = [];
        for (var i = 0; i < data_all.length; i++) {
          if (data_all[i].commonuser_id === this.info.id_c) {
            data_input.push(data_all[i]);
          }
        }
        this.setState({DATA: data_input, isRefreshing: false});
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
        <Text style={styles.content}> {this.decodeDate(item.datetime)}</Text>
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
      <SafeAreaView style={styles.whole}>
        {/* <View style={styles.container}> */}
        <Text style={styles.name}>{this.info.name}</Text>
        {this.info.gender === 'M' ? (
          <Text style={styles.content}>性别： 男</Text>
        ) : (
          <Text style={styles.content}>性别： 女</Text>
        )}

        <Text style={styles.content}>出生年月：{this.info.birth}</Text>
        {/* </View> */}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  name: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 32,
  },
  content: {
    fontSize: 20,
  },
  whole: {
    height: Dimensions.get('window').height,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  title: {
    textAlignVertical: 'center',
    fontSize: 28,
  },
  device_title: {
    textAlignVertical: 'center',
    fontSize: 20,
  },
  divide: {
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
});
