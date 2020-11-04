import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    LogBox,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Base64} from 'js-base64';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default class SelfInfoScene extends Component {
    name = '';
    token = '';
    facility_id = '';
    data = '';
    photoYES = 0;

    constructor(props) {
        super(props);
        this.state = {
            uri: '',
        };
    }

    nameChanged = (newName) => {
        this.name = newName;
    };

    onUri = (uri) => {
        this.setState(uri);
    };

    regisPhoto = () => {
        const {navigate} = this.props.navigation; //获取navigation的navigate方法
        navigate('photo', {onUri: this.onUri});
        this.photoYES = 1;
    };

    Photo = () => {
        if (this.photoYES === 1) {
            console.log(this.state.uri);
            return <Image source={{uri: this.state.uri}}/>;
        } else {
            return <Image source={require('../icon/add.png')}/>;
        }
    };

    add = () => {
        RNFS.readFile(this.state.uri, 'base64')
            .then((content) => {
                this.data = Base64.encode(content);
            })
            .then(() => {
                fetch(
                    'https://backend-vegeteam.app.secoder.net/api/mobile/admin/add/',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            user_token: this.token,
                            facility_id: this.facility_id,
                            name: this.name,
                            gender: 'M',
                            birth: '2000-01-01',
                            image: this.data,
                        }),
                    },
                ).then((data) => {
                    if (data.code === 400) console.log('提交失败');
                    else Alert.alert('添加', '添加成功');
                    const {goBack} = this.props.navigation;
                    goBack();
                });
            })
            .catch(() => {
                console.log('图片读取失败');
            });
    };

    render() {
        this.token = this.props.route.params.token;
        this.facility_id = this.props.route.params.facility_id;
        return (
            <View style={styles.container}>
                <this.Photo/>
                <TouchableOpacity onPress={this.regisPhoto} style={styles.button}>
                    <Text>提交照片</Text>
                </TouchableOpacity>
                <View style={styles.inputBox}>
                    <TextInput
                        ref="name"
                        onChangeText={this.nameChanged} //添加值改变事件
                        style={styles.input}
                        autoCapitalize="none" //设置首字母不自动大写
                        underlineColorAndroid={'transparent'} //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'} //设置占位符颜色
                        placeholder={'name'} //设置占位符
                    />
                </View>
                <TouchableOpacity onPress={this.add} style={styles.button}>
                    <Text>添加</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        width: 200,
        height: 40,
        fontSize: 20,
        color: '#000', //输入框输入的文本为白色
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
        marginTop: 20,
    },
    button: {
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#66f',
        marginTop: 10,
    },
    content: {
        fontSize: 40,
    },
});
