import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

export default class PersonManagerScene extends Component {
  token = '';
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token.route.params.token;
    this.state = {
      DATA: [],
    };
    this.getDATA();
  }

  goIn = (item) => {};

  Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          this.goIn(item);
        }}
        style={styles.container}>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  refresh = () => {
    this.getDATA();
  };

  getDATA = () => {
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/commonuser/all/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.commonuser);
        this.setState({DATA: data.commonuser});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  render() {
    //this.token = this.props.route.params.token;
    this.token = this.props.route.params.token.route.params.token;

    const renderItem = ({item}) => <this.Item item={item} />;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_c.toString()}
        />
        <Button onPress={this.refresh} title="刷新" />
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
