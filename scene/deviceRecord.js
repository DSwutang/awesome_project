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
    this.state = {
      uri: '',
    };
  }
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
