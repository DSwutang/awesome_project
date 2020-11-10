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
