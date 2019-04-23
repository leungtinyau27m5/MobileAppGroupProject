import React, { Component } from 'react'
import {
    AppState,
    BackHandler,
    View,
    Text,
    Image,
    ImageBackground,
    ImageEditor,
    AsyncStorage,
    Button,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
//not in used!!!!!!!!!!!!!! puzzle image game mode
const options = {
    title: 'select avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}
export default class PuzzlingImage extends Component {
    constructor(props) {
        super()
        this.state = {
            type: null,
            image: null,
            currentAvailable: {
                row: null,
                col: null,
            },
            isWin: false,
            steps: 0
        }
    }
    componentWillMount() {
        //this.cropImaged()
    }
    pickImage = async() => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)

            if(response.didCancel) {

            } else if(response.error) {

            } else if (response.customButton) {
                console.log(response.customButton)
            } else {
                const source = { uri: response.uri }
                this.cropImaged(source)
            }
        })
    }
    cropImaged = async(source) => {
        /*
        ImageCropPicker.openCropper({
            path: source.uri,
            width: 400,
            height: 400,
        }).then(image => {
            console.log(image.cropRect)
            this.setState({
                image: {
                    uri: image.path
                }
            })
        })*/
        
        let cropData = {
            offset:{x:0,y:0}, 
            size:{width:20, height:20},
        }
        console.log('image conten', source.uri)
        ImageEditor.cropImage(
            source.uri,
            cropData,
            (croppedImageUri) => {this.setState({image: {uri: croppedImageUri}})},
            (cropError) => {console.log('crop image error: ', cropError)} 
        )
        /*
        let resizeUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(
                source.uri,
                cropData,
                (uri) => resolve(uri),
                () => reject()
            )
        })
        this.setState({ image: {uri: resizeUri}})*/
        /*
        await ImageEditor.cropImage(
            source.uri,
            cropData,
            (successURI) => { this.setState({image: {uri: successURI}}) },
            (error) => { console.log('cropImage', error)}
        )*/
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
        BackHandler.addEventListener('hardwareBackPress', () => this.props.screenProps.handleBackButtonPress('ChoosePuzzle'))
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.props.screenProps.handleAppStateChange)
        BackHandler.removeEventListener('hardwareBackPress', () => this.props.screenProps.handleBackButtonPress('ChoosePuzzle'))
    }
    render() {
        return (         
            <View>
                <View style={{width: 267, height: 267}}>
                    <Image
                        source={this.state.image}
                        style={{ width: 200, height: 200, resizeMode: 'contain'}}
                    />
                    <Text>Coming Soon</Text>
                    <Button
                        title="Back To previous Page"
                        onPress={() => this.pickImage()}
                        //onPress={()=> this.props.navigation.navigate('ChoosePuzzle')}
                    />
                </View>
            </View>
        )
    }
}
