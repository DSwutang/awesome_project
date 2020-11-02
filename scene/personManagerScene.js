import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';

export default class PersonManagerScene extends Component {
  DATA = [
    {
      name: '小明',
      id_c: '111',
    },
    {
      name: '小红',
      id_c: '222',
    },
  ];

  Item = ({name}) => (
    <View style={styles.item}>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  );

  getUser = () => {
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/commonuser/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
          facility_id: 2,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        //this.DATA = data.commonuser;
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  render() {
    //this.token = this.props.route.params.token;
    this.token = this.props.route.params.token.route.params.token;

    const renderItem = ({item}) => <this.Item name={item.name} />;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_c}
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
