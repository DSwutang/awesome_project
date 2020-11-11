import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import {SwipeAction} from '@ant-design/react-native';

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

  del = (name, gender, birth, id_c) => {
    fetch(
      'https://backend-vegeteam.app.secoder.net/api/mobile/admin/unbindfacility/',
      {
        method: 'POST',
        body: JSON.stringify({
          user_token: this.token,
          facility_id: deviceID,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          Alert.alert('删除设备', '删除成功');
        } else {
          Alert.alert('删除设备', '删除失败');
        }
        this.getDATA();
      })
      .catch(() => {
        console.log('连接失败');
      });
  };

  Item = ({name}) => (
    <SwipeAction
      autoClose
      style={{backgroundColor: 'transparent'}}
      right={[
        {
          text: '删除',
          onPress: () => {
            // 删除逻辑
            this.del(name);
          },
          style: {backgroundColor: 'red', color: 'white'},
        },
      ]}>
      <View style={styles.item}>
        <View style={styles.container}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    </SwipeAction>
  );

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

    const renderItem = ({item}) => <this.Item name={item.name} />;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_c.toString()}
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
