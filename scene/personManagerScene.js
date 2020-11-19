import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';

export default class PersonManagerScene extends Component {
  token = '';
  textInput = '';
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token.route.params.token;
    this.state = {
      DATA: [],
      isRefreshing: false,
    };
    this.getDATA();
  }

  goIn = (item) => {
    const {navigate} = this.props.navigation;
    navigate('pageStack', {
      screen: 'simpleInfo',
      params: {info: item, token: this.token},
    });
  };

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

  getDATA = (refreshen = 0) => {
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
        if (refreshen) {
          let data_output = [];
          for (var i = 0; i < data.number; i++) {
            if (data.commonuser[i].name.indexOf(this.textInput) !== -1) {
              data_output.push(data.commonuser[i]);
            }
          }
          this.setState({DATA: data_output, isRefreshing: false});
        } else {
          this.setState({DATA: data.commonuser, isRefreshing: false});
        }
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

  changeSearch = (newInput) => {
    this.textInput = newInput;
  };

  refreshDATA = () => {
    if (this.textInput === '') {
      this.getDATA();
    } else {
      this.getDATA(1);
    }
  };

  render() {
    //this.token = this.props.route.params.token;
    this.token = this.props.route.params.token.route.params.token;
    const {isRefreshing} = this.state || {};
    const renderItem = ({item}) => <this.Item item={item} />;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBox}>
          <TouchableOpacity onPress={this.refreshDATA}>
            <Image
              source={require('../icon/search.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none" //设置首字母不自动大写
            underlineColorAndroid={'transparent'} //下划线颜色设置为透明
            placeholderTextColor={'#aaa'} //设置占位符颜色
            placeholder={'搜索用户'}
            onChangeText={this.changeSearch}
          />
        </View>
        <View ItemSeparatorComponent={this._separator} />
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
  searchBox: {
    flex: 0,
    height: 35,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#E6E7E8',
    borderRadius: 5,
  },
  searchIcon: {
    alignSelf: 'center',
    marginLeft: 7,
    marginRight: 7,
    width: 35,
    height: 35,
  },
  inputText: {
    padding: 0,
    alignSelf: 'center',
    marginTop: 0,
    flex: 1,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    lineHeight: 30,
    textAlignVertical: 'center',
    textDecorationLine: 'none',
  },
});
