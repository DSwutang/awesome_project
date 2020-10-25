import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TouchableHighlight} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class PhotoScene extends Component {
  backToLogin = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack(); //返回上一界面
  };

  state = {cameraType: RNCamera.Constants.Type.front};

  _switchCamera() {
    this.setState({
      cameraType:
        this.state.cameraType === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    });
    console.log(this.state);
  }

  _takePicture() {
    this.refs.camera
      .takePictureAsync()
      .then((response) => {
        console.log('response:' + response);
        console.log('response.uri:' + response.uri);
      })
      .catch((error) => {
        console.log('error:' + error);
      });
  }

  render() {
    return (
      <RNCamera
        ref="camera"
        style={styles.container}
        type={this.state.cameraType}
        autoFocus={RNCamera.Constants.AutoFocus.on}>
        <TouchableHighlight onPress={this._switchCamera.bind(this)}>
          <Text style={styles.switch}>Switch Camera</Text>
        </TouchableHighlight>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  switch: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 30,
    color: 'red',
  },
  picture: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 30,
    color: 'red',
  },
});
