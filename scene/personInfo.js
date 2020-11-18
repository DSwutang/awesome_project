import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';

export default class PersonInfo extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token;
    this.info = this.props.route.params.info;
    this.deviceID = this.props.route.params.facility_id;
    this.state = {
      DATA: [],
    };
    this.getDATA();
  }
  getDATA = () => {
    console.log(this.info);
    console.log('debug');
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
        this.setState({DATA: data_input});
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

  render() {
    const renderItem = ({item}) => <this.Item item={item} />;
    return (
      <View style={styles.container}>
        <Text>{this.info.name}</Text>
        <Text>{this.info.gender}</Text>
        <Text>{this.info.birth}</Text>
        <Text>进出记录</Text>
        <FlatList
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.commonuser_id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
