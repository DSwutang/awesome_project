import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TouchableHighlight} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class PhotoScene extends Component {
  backToLogin = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack(); //返回上一界面
  };

  _takePicture() {
    this.refs.camera
      .takePictureAsync()
      .then((response) => {
        console.log('response.uri:' + response.uri);
      })
      .catch((error) => {
        console.log('error:' + error);
      });
  }

  render() {
    return (
      <RNCamera ref="camera" style={styles.container}>
        <TouchableHighlight onPress={this._takePicture.bind(this)}>
          <Text style={styles.picture}>Take Picture</Text>
        </TouchableHighlight>
      </RNCamera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  toolBar: {
    width: 200,
    margin: 40,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});
