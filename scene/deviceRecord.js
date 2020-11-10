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

export default class DeviceRecord extends Component {
  constructor(props) {
    super(props);
    console.log('record');
    console.log(this.props.route.params);
    this.token = this.props.route.params.token;
    this.deviceID = this.props.route.params.id;
    this.state = {
      DATA: [],
    };
    this.getDATA();
  }
  getDATA = () => {
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
        this.setState({DATA: _data.data});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };
  Item = ({name}) => (
    <View>
      <Text>{name}</Text>
    </View>
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
