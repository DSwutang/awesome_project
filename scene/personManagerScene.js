import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  RefreshControl,
  Button,
} from 'react-native';

export default class PersonManagerScene extends Component {
  token = '';
  textInput = '';
  genderInput = '';
  ageGreater = 0;
  ageLesser = 0;
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token.route.params.token;
    this.state = {
      DATA: [],
      isRefreshing: false,
      showSenior: false,
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
    const cal_age = (birth) => {
      let birth_age = parseInt(birth.substring(0, 4), 10);
      // console.log(2020 - birth_age);
      return 2020 - birth_age;
    };
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
        // console.log(data.commonuser);
        if (refreshen === 1) {
          let data_output = [];
          for (var i = 0; i < data.number; i++) {
            if (data.commonuser[i].name.indexOf(this.textInput) !== -1) {
              data_output.push(data.commonuser[i]);
            }
          }
          this.setState({DATA: data_output, isRefreshing: false});
        } else if (refreshen === 2) {
          let data_output = [];
          for (var i = 0; i < data.number; i++) {
            if (
              (this.textInput === '' ||
                data.commonuser[i].name.indexOf(this.textInput) !== -1) &&
              (this.genderInput === '' ||
                data.commonuser[i].gender === this.genderInput) &&
              (this.ageGreater === 0 ||
                cal_age(data.commonuser[i].birth) >= this.ageGreater) &&
              (this.ageLesser === 0 ||
                cal_age(data.commonuser[i].birth) <= this.ageLesser)
            ) {
              data_output.push(data.commonuser[i]);
            }
          }
          this.setState({DATA: data_output, isRefreshing: false});
        } else {
          this.setState({DATA: data.commonuser, isRefreshing: false});
        }
      })
      .catch(() => {
        // console.log('????????????');
        Alert.alert('??????', '????????????');
      });
  };

  _onRefresh() {
    console.log('>>????????????>>');
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

  changeGender = (newInput) => {
    if (newInput === '???') this.genderInput = 'M';
    else if (newInput === '???') this.genderInput = 'F';
    else this.genderInput = '';
  };

  changeGreater = (newInput) => {
    let tmpAge = parseInt(newInput, 10);
    if (isNaN(tmpAge) === false) this.ageGreater = tmpAge;
    else this.ageGreater = 0;
  };

  changeLesser = (newInput) => {
    let tmpAge = parseInt(newInput, 10);
    if (isNaN(tmpAge) === false) this.ageLesser = tmpAge;
    else this.ageLesser = 0;
  };

  refreshDATA = () => {
    if (this.state.showSenior === false) {
      if (this.textInput === '') {
        this.getDATA();
      } else {
        this.getDATA(1);
      }
    } else {
      this.getDATA(2);
    }
  };

  showSenior = () => {
    if (this.state.showSenior === false) {
      this.setState({showSenior: true});
    } else {
      this.setState({showSenior: false});
    }
  };

  render() {
    //this.token = this.props.route.params.token;
    this.token = this.props.route.params.token.route.params.token;
    const {isRefreshing} = this.state || {};
    const renderItem = ({item}) => <this.Item item={item} />;
    // console.log(this.state.showSenior);
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
            autoCapitalize="none" //??????????????????????????????
            underlineColorAndroid={'transparent'} //??????????????????????????????
            placeholderTextColor={'#aaa'} //?????????????????????
            placeholder={'????????????'}
            onChangeText={this.changeSearch}
          />
          <Button title="??????" onPress={this.showSenior} />
        </View>
        {this.state.showSenior && (
          <View style={styles.searchBoxVer}>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none" //??????????????????????????????
              underlineColorAndroid={'transparent'} //??????????????????????????????
              placeholderTextColor={'#aaa'} //?????????????????????
              placeholder={'????????????'}
              onChangeText={this.changeGender}
            />
            <TextInput
              style={styles.inputText}
              autoCapitalize="none" //??????????????????????????????
              underlineColorAndroid={'transparent'} //??????????????????????????????
              placeholderTextColor={'#aaa'} //?????????????????????
              placeholder={'???????????????'}
              keyboardType="numeric"
              onChangeText={this.changeGreater}
            />
            <TextInput
              style={styles.inputText}
              autoCapitalize="none" //??????????????????????????????
              underlineColorAndroid={'transparent'} //??????????????????????????????
              placeholderTextColor={'#aaa'} //?????????????????????
              placeholder={'???????????????'}
              keyboardType="numeric"
              onChangeText={this.changeLesser}
            />
          </View>
        )}
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
  searchBoxVer: {
    flex: 0,
    height: 110,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
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
