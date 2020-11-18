import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class PhotoScene extends Component {
  uri = '';
  back = () => {
    const {navigation} = this.props; //获取navigation的goBack方法
    this.props.route.params.onUri({uri: this.uri});
    navigation.goBack(); //返回上一界面
  };

  state = {cameraType: RNCamera.Constants.Type.front};

  _takePicture() {
    this.refs.camera
      .takePictureAsync()
      .then((response) => {
        console.log('response:' + response);
        console.log('response.uri:' + response.uri);
        this.uri = response.uri;
        this.back();
      })
      .catch((error) => {
        console.log('error:' + error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref="camera"
          style={styles.container}
          type={this.state.cameraType}
          autoFocus={RNCamera.Constants.AutoFocus.on}>
          <TouchableHighlight
            onPress={this._takePicture.bind(this)}
            style={styles.button}>
            <Text style={styles.button_text}>拍照</Text>
          </TouchableHighlight>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    width: '30%',
    margin: '10%',
    marginTop: Dimensions.get('window').height * 0.85,
    marginLeft: '35%',
    height: Dimensions.get('window').height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    textAlign: 'center',
    fontSize: 15,
  },
});
