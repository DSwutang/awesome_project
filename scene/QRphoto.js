import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TouchableHighlight} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class PhotoScene extends Component {
  state = {cameraType: RNCamera.Constants.Type.front};

  _onBarCodeRead(e) {
    //data: string;
    //rawData?: string;
    //type: keyof BarCodeType;
    //bounds:
    //For iOS use `{ origin: Point<string>, size: Size<string> }`
    //For Android use `{ width: number, height: number, origin: Array<Point<string>> }`
    console.log(e);
    console.log(e.data);
  }

  render() {
    return (
      <RNCamera
        ref="camera"
        style={styles.container}
        type={this.state.cameraType}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        onBarCodeRead={this._onBarCodeRead.bind(this)}
      />
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
});
