import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert,
    Image,
    TouchableHighlight,
    AsyncStorage,
    AppState,
    BackHandler,
    ToastAndroid
} from 'react-native'

import Modal from 'react-native-modal'
import BackgroundTimer from 'react-native-background-timer'

import { serverConn } from '../server/config'
import ModalNewRecord from '../Components/ModalNewRecord'
import DeviceInfo from 'react-native-device-info'
import { Items } from '../Components/Items'
import { ItemBox } from '../Components/ItemBox'

export default class Search extends Component {
    constructor(props) {
        super()
        this.state = {
            allItems: props.navigation.state.params.allItems,
            life: 5,
            gameOver: false,
            modalGameOver: false,
            counting: 90,
            username: null,
            imageChanged: false,
            register: null,
            phoneNumber: null
        }
        this._renderRows = this._renderRows.bind(this)
        //this.getPhoneNumber()
        this._getName()
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
        BackHandler.addEventListener('hardwareBackPress', this.toastWarningMsg)
        this.intervalId = BackgroundTimer.setInterval(
            () => this.setState((prevState) => ({
                counting: prevState.counting - 1,
            })
        ), 1000)
    }
    componentDidUpdate(){
        if (this.state.counting === 0) {
            BackgroundTimer.clearInterval(this.intervalId)
            this.timeOver()
        }
    }
    toastWarningMsg = () => {
        ToastAndroid.show('Double press to forgive the game!', ToastAndroid.SHORT)
        BackHandler.addEventListener('hardwareBackPress', this.doubleBackButtonPress)
        this.doubleBack = BackgroundTimer.setTimeout(() => {
            BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
        }, 2000)
        return true
    }
    doubleBackButtonPress = () => {
        this.props.navigation.navigate('SelectGame')
        return true
    }
    timeOver = () => {
        if (this.state.counting === 0) {
            this.setState({
                gameOver: true,
                modalGameOver: true,
                counting: -1
            })
        }
    }
    _getName = async() => {
        const name = await AsyncStorage.getItem('username')
        console.log(name)
        if (name !== null) {
            this.setState({
                username: name
            })
        }
    }
    componentWillUnmount = async() => {
        AppState.removeEventListener('change', this.props.screenProps.handleAppStateChange);
        BackgroundTimer.clearInterval(this.intervalId)
        BackHandler.removeEventListener('hardwareBackPress', this.toastWarningMsg)
        BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
        BackgroundTimer.clearTimeout(this.doubleBack)
        this.props.screenProps.addTotalTimePlayed(90 - this.state.counting)

        let value = await AsyncStorage.getItem('gameRecord')
        let records;
        if (value !== null)
            records = JSON.parse(value)
        let today = new Date()
        //console.error(records)
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear()
        const time = this.props.screenProps.showPlayedTime()
        today = `${yyyy}/${mm}/${dd}`
        const thisRecord = {
            date: today,
            time: time
        }
        if (records == null)
            records = []
        records.push(thisRecord)
        AsyncStorage.setItem('gameRecord', JSON.stringify(records))
    }
    lifeChange = () => {
        this.setState((prevState, props) => ({
            life: prevState.life - 1
        }));
        if (this.state.life == 0) {
            this.setState({
                gameOver: true,
                modalGameOver: true
            })
        }
        this.props.screenProps.addTotalTimePlayed(90 - this.state.counting)
    }
    _renderRows = () => {
        let allItems = this.state.allItems
        let renderElem = allItems.map((element, i) => {
            return (
                <ItemBox
                    key={`item-box-${i}`}
                    item={element}
                    handleClick={ this.props.screenProps.handleClick }
                    lifeChange={ this.lifeChange }
                />
            )
        })
        return renderElem
    }
    _renderLife = () => {
        let lifeItems = []
        for (let i = 0; i < this.state.life; i++) {
            lifeItems.push(
                <View
                    key={i}
                    style={{
                        marginRight: 5,
                        marginLeft: 5
                    }}
                >
                    <Items
                        key={i}
                        turning={false}
                        isReverse={false}
                        shape={8} //heart
                        color={0} //red
                    />
                </View>
            )
        }
        return lifeItems
    }
    _closeModal = () => {
        this.setState({
            modalGameOver: false
        }, () => {
            this.props.navigation.navigate('SelectGame')
        })
    }
    onTextChange = (text) => {
        this.setState({
            username: text
        })
    }
    imageIsChanged = () => {
        this.setState({
            imageChanged: true
        })
    }
    getPhoneNumber = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                {
                    title: 'Your Phone number is needed',
                    message: 
                        'We need your phone number to identify yourself',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK'
                }
            )
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Phone Number is granted')
            } else {
                ToastAndroid.show('Phone Number is not granted', ToastAndroid.SHORT)
            }
        } catch (err) {
            ToastAndroid.show('Cant grant Phone Number', ToastAndroid.SHORT)
        }
    }
    registerPhoneNumber = async(phoneNumber, imageUri) => {
        const uriPart = imageUri.split('.')
        const fileExtension = uriPart[uriPart.length - 1]
        const data = {
            request: 'register',
            phone: phoneNumber,
            username: this.state.username,
            image: {
                uri: imageUri,
                name: `${phoneNumber}.${fileExtension}`,
                type: `image/${fileExtension}`
            }
        }
        let body = new FormData()
        body.append('request', data.request)
        body.append('phone', data.phone)
        body.append('username', data.username)
        body.append('image', {
            uri: data.image.uri,
            name: data.image.name,
            type: data.image.type
        })
        fetch(serverConn.serverUri, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            /*
            header: {
                //'Accept': 'application/json',
                //'Content-Type': 'application/json'
                'Content-Type': 'multipart/form-data',
            },*/
            //body: JSON.stringify(data)
            body: body
        })
        .then((response) => response.json())
        //.then((response) => console.log(response))
        .then(responseData => {
            this._storeRid(responseData)
        })
        .catch((err) => {
            ToastAndroid.show('Register Request Failed', ToastAndroid.LONG)
            console.log(err)
        })
        .done()
    }
    _storeRid = async(responseData) => {
        if (responseData) {
            await AsyncStorage.setItem('rid', responseData)
            await AsyncStorage.setItem('username', this.state.username)
            this.setState({ 
                register: responseData
            }, () => this.fetchData(responseData))
        }
    }
    uploadMyGameRecord = async(imageUri) => {
        let rid = await AsyncStorage.getItem('rid')
        let phoneNumber
        if (rid == null) {
            this.getPhoneNumber()
            phoneNumber = DeviceInfo.getPhoneNumber()
            this.registerPhoneNumber(phoneNumber, imageUri)
        } else {
            this.updateMyPersonalData(rid, imageUri)
            this.setState({ 
                register: rid 
            }, () => this.fetchData(rid))
        }
    }
    updateMyPersonalData = async(rid, imageUri) => {
        const phoneNumber = DeviceInfo.getPhoneNumber()
        //const OriginImg = await AsyncStorage.getItem('myIcon')
        const OriginName = await AsyncStorage.getItem('username')
        const uriPart = imageUri.split('.')
        const fileExtension = uriPart[uriPart.length - 1]
        const data = {
            request: 'updateMyPersonalData',
            username: null,
            rid: rid,
            image: {
                uri: null,
                name: null,
                type: null,
            }
        }
        let body = new FormData()
        if (this.state.imageChanged) {
            data.image.uri = imageUri
            data.image.name = `${phoneNumber}.${fileExtension}`
            data.image.type = `image/${fileExtension}`
        }
        console.log('test case', OriginName)
        body.append('request', data.request)
        body.append('rid', data.rid)
        if (OriginName !== this.state.username)
            data.username = this.state.username
        if (data.username !== null)
            body.append('username', data.username)
        else 
            body.append('username', '')
        if (data.image.uri !== null) {
            body.append('image', {
                uri: data.image.uri,
                name: data.image.name,
                type: data.image.type
            })
        } else {
            body.append('image', null)
        }
        console.log('POST    00000000000000000000000000   ', body)
        if (data.username !== '' || data.image.uri !== null) {
            console.log('it is not null and run!!!!!!!!')
            fetch(serverConn.serverUri, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: body
            })
            .then((response) => response.json())
            .then(responseData => {
                console.log(responseData)
                this.setItems(imageUri)
            })
            .catch((err) => {
                ToastAndroid.show('Register Request Failed', ToastAndroid.LONG)
                console.log(err)
            })
            .done()
        }
    }
    setItems = async(imageUri) => {
        await AsyncStorage.setItem('username', this.state.username)
        await AsyncStorage.setItem('myIcon', imageUri)
    }
    fetchData = async(rid) => {
        const data = {
            request: 'updateGameRecord',
            game: 'memory',
            level: null,
            rid: rid,
            record: this.props.screenProps.showPlayedTime(),
        }
        fetch(serverConn.serverUri, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then(responseData => {
            console.log(responseData)
        })
        .catch((error) => {
            ToastAndroid.show('Fetch Request Failed', ToastAndroid.LONG)
            console.log("server request Error", error)
        })
        .done(() => {
            this.setState({
                modalGameOver: false
            }, () => {
                this.props.navigation.navigate('SelectGame')
            })
        })
    }
    render() {
        return(
            <SafeAreaView>
                <Modal
                    isVisible={this.state.modalGameOver}
                    animationIn='flash'
                >
                    <ModalNewRecord 
                        onPress={this._closeModal}
                        confirmRecord={this.uploadMyGameRecord}
                        score={this.props.screenProps.showPlayedTime()}
                        onChangeText={this.onTextChange}
                        username={this.state.username}
                        imageIsChanged={this.imageIsChanged}
                    />
                </Modal>
                <View style={{
                    width: '100%',
                    height: '10%',
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    {this._renderLife()}
                    <Text style={{justifyContent: 'center', fontSize: 35, marginLeft: 5}}>{this.state.counting}</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '90%',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        justifyContent: 'center',
                        backgroundColor: '#E4E4E4'
                    }}
                >
                    {this._renderRows()}
                </View>
            </SafeAreaView>
        )
    }
}
//{ this._generateRows() }</Grid>
const styles = StyleSheet.create({
    modalContainer: {
        height: '45%',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#DD1111',
        borderRadius: 35
    }
})
/*
<View style={styles.modalContainer}>
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>Your Lose the Game!</Text>
                        <Image
                            source={require('../assets/img/giphy.gif')}
                            resizeMode='cover'
                            style={{width: 180, height: 130}}
                        />
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>Your Record is :</Text><Text style={{color: '#FFFFFF', fontSize: 28}}>Level {this.props.screenProps.showPlayedTime()}</Text>
                        <TouchableHighlight
                            style={{
                                marginTop: 15
                            }}
                            onPress={()=>{
                                this._closeModal(!this.state.modalGameOver)
                            }}
                        >
                            <Text style={{color: '#FFFFFF', fontSize: 22}}>Retry!</Text>
                        </TouchableHighlight>
                    </View>
*/