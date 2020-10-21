import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
// import {Camera} from 'react-native-camera';

export default class PhotoScene extends Component {
  backToLogin = () => {
    const {goBack} = this.props.navigation; //获取navigation的goBack方法
    goBack(); //返回上一界面
  };

  render() {
    return <Text>OK</Text>;
    // return (
    //   <View style={styles.container}>
    //     <Camera
    //       ref={(cam) => {
    //         this.camera = cam;
    //       }}
    //       style={styles.preview}
    //       aspect={Camera.constants.Aspect.fill}>
    //       <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
    //         [CAPTURE]
    //       </Text>
    //     </Camera>
    //   </View>
    // );
  }

  // takePicture() {
  //   const options = {};
  //   //options.location = ...
  //   this.camera
  //     .capture({metadata: options})
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  // }
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
