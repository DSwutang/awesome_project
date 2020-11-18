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
  RefreshControl,
} from 'react-native';

export default class PersonManagerScene extends Component {
  token = '';
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token.route.params.token;
    this.state = {
      DATA: [],
      isRefreshing: false,
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
        this.setState({DATA: data.commonuser, isRefreshing: false});
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  _onRefresh() {
    console.log('>>下拉刷新>>');
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
    //this.token = this.props.route.params.token;
    this.token = this.props.route.params.token.route.params.token;
    const {isRefreshing} = this.state || {};
    const renderItem = ({item}) => <this.Item item={item} />;
    return (
      <SafeAreaView style={styles.container}>
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
