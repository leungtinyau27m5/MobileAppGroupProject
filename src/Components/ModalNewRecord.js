import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    ToastAndroid,
    AsyncStorage
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
//view options in image picker
const options = {
    title: 'select avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}
//render records in the highscroe view
export default class ModalNewRecord extends Component {
    constructor(props) {
        super()
        this.state = {
            image: {
                uri: null
            }
        }
        this._getIcon()
    }
    _getIcon = async() => { //get the icon which stored in the local storage already
        const imageUri = await AsyncStorage.getItem('myIcon')
        if (imageUri !== null) {
            this.setState({
                image: {
                    uri: imageUri
                },
            })
        } 
    }
    onPresSelectImage = () => {
        ImagePicker.showImagePicker(options, (response) => { //picker is closed or stopped
            if(response.didCancel) {
                ToastAndroid.show('Image picker is closed', ToastAndroid.SHORT)
            } else if(response.error) {
                ToastAndroid.show('permission is not granted', ToastAndroid.SHORT)
            } else {
                const source = { uri: response.uri }
                this.cropImaged(source)
            }
        })
    }
    cropImaged = (source) => { //crop the image after pick up
        //console.log(source)
        ImageCropPicker.openCropper({
            path: source.uri,
            width: 400,
            height: 400,
        }).then(image => {
            this.props.imageIsChanged(image.path)
            this.setState({
                image: {
                    uri: image.path
                }
            }, async() => {
                AsyncStorage.setItem('myIcon', image.path)
            })
        })
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={{
                    flex: 2, 
                    flexDirection: 'row',
                    backgroundColor: '#44C994',
                    justifyContent: 'center',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                }}>
                    <View style={{flex: 11, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 22, color: '#FFF'}}>
                            Your Record!
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => this.props.onPress()}
                        >
                            <Ionicons
                                name="ios-close-circle-outline"
                                size={35}
                                style={{color: '#FFF'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 9, paddingHorizontal: 20}}>
                    <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                        onPress={() => this.onPresSelectImage()}
                        style={{justifyContent: 'center', alignItems: 'center'}}
                        >
                        <Text>Select your Icon</Text>
                        <Image
                            source={{uri: this.state.image.uri}}
                            style={{width: 120, height: 120}}
                            borderRadius={60}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                        <View style={{flex: 2, justifyContent: 'center', flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center', width: '100%'}}>
                                <TextInput
                                    editable={true}
                                    maxLength={20}
                                    onChangeText={(text) => this.props.onChangeText(text)}
                                    value={this.props.username}
                                    style={{fontSize: 22, borderColor: '#000', borderWidth: 1, width: '100%', paddingHorizontal: 5}}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Text style={{fontSize: 30, color: '#9BC746'}}>{this.props.score}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity 
                    style={[styles.touchableButton, styles.confirmText]}
                    onPress={() => this.props.confirmRecord(this.state.image.uri)}
                    >
                        <Text style={styles.normalText}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.touchableButton, styles.cancelText]}
                    onPress={() => this.props.onPress()}
                    >
                        <Text style={styles.normalText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    modalContainer: {
        height: '75%',
        width: '95%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#F2F2F2',
        borderRadius: 15
    },
    touchableButton: {
        marginTop: 55,
        marginLeft: 10,
        marginRight: 10,
        width: '45%',
        height: 55,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderRadius: 5,
        shadowColor: '#444444',
        shadowOffset: {
            width: 1,
            height: -1
        },
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmText: {
        backgroundColor: '#44C994',
    },
    cancelText: {
        backgroundColor: '#FF3228',
    },
    normalText: {
        color: '#FFF',
        fontSize: 22
    }
})