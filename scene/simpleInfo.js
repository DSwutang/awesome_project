import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

export default class PersonInfo extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.route.params.token;
    this.info = this.props.route.params.info;
    this.state = {
      DATA: [],
    };
  }

  render() {
    const renderItem = ({item}) => <this.Item item={item} />;
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{this.info.name}</Text>
        {this.info.gender === 'M' ? (
          <Text style={styles.content}>性别： 男</Text>
        ) : (
          <Text style={styles.content}>性别： 女</Text>
        )}
        <Text style={styles.content}>出生年月：{this.info.birth}</Text>
      </View>
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
});
