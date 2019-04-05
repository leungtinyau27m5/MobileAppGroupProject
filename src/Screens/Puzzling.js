import React, { Component } from 'react'
import {
    AppState,
    View,
    Text,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableHighlight,
    BackHandler,
    AsyncStorage,
    Button,
    ToastAndroid,
    PermissionsAndroid
} from 'react-native'
import Modal from 'react-native-modal'
import BackgroundTimer from 'react-native-background-timer'
import { serverConn } from '../server/config'
import ModalNewRecord from '../Components/ModalNewRecord'
import DeviceInfo from 'react-native-device-info'
const {height, width} = Dimensions.get('window')
const config = {
    easy: {
        boardArray: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, '']
        ],
        width: '33.33%',
        height: width * 0.33,
        fontStyle: {
            size: 20
        }
    },
    normal: {
        boardArray: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, '']
        ],
        width: '25%',
        height: width * 0.25,
        fontStyle: {
            size: 18
        }
    },
    hard: {
        boardArray: [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, '']
        ],
        width: '20%',
        height: width * 0.2,
        fontStyle: {
            size: 16
        }
    }
}
class Piece extends Component {
    constructor(props) {
        super()
    }
    render() {
        return (
            <TouchableOpacity 
                style={{
                    width: this.props.config.width,
                    height: this.props.config.height,
                    borderColor: '#007ACC',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
                onPress={() => this.props.handleClick(this.props.position)}
            >
            <Text style={{fontSize: this.props.config.fontStyle.size}}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}
export default class Puzzling extends Component {
    constructor(props) {
        super()
        const { navigation } = props
        const c = navigation.state.params.level == 'easy' ? config.easy : navigation.state.params.level == 'normal' ? config.normal : config.hard
        this.state = {
            level: navigation.state.params.level,
            config: c,
            currentAvailable: {
                row: c.boardArray.length - 1,
                col: c.boardArray[0].length - 1
            },
            isWin: false,
            //isWin: true,
            steps: 0,
            isRearranged: false,
            register: null,
            username: 'your name',
            imageChanged: false
        }
        this._getName()
    }
    componentWillMount() {
        this.initialGame()
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
        BackHandler.addEventListener('hardwareBackPress', this.toastWarningMsg)
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.props.screenProps.handleAppStateChange)
        BackHandler.removeEventListener('hardwareBackPress', this.toastWarningMsg)
        BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
        BackgroundTimer.clearTimeout(this.doubleBack)
    }
    toastWarningMsg = () => {
        ToastAndroid.show('Double press to back to the scene!', ToastAndroid.SHORT)
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
    backToSelectScene() {
        this.saveGame()
        this.props.screenProps.handleBackButtonPress('ChoosePuzzle')
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
    saveGame = async() => {
        const oldGame = {
            config: this.state.config,
            currentAvailable: this.state.currentAvailable,
            isWin: this.state.isWin,
            steps: this.state.steps
        }
        let loadTarget = this.state.level == 'easy' ? 'oldGame' : this.state.level == 'normal' ? 'oldGameNormal' : 'oldGameHard'
        await AsyncStorage.setItem(loadTarget, JSON.stringify(oldGame))
    }
    cleanTheCache = async() => {
        await AsyncStorage.removeItem('oldGame')
        ToastAndroid.show('Cache and Game Record is Clean', ToastAndroid.SHORT)
        this.props.navigation.navigate('ChoosePuzzle')
    }
    checkWin = async() => {
        let isWin = true
        let counting = 1
        const max = this.state.config.boardArray.length * this.state.config.boardArray[0].length -1
        this.state.config.boardArray.forEach((element, i) => {
            element.forEach((ele, j) => {
                if (counting > max) return
                if (ele !== counting) isWin = false
                ++counting
            })
        })
        this.saveGame()
        if (!isWin) return
        let loadTarget = this.state.level == 'easy' ? 'oldGame' : this.state.level == 'normal' ? 'oldGameNormal' : 'oldGameHard'
        let oldGame = JSON.parse(await AsyncStorage.getItem(loadTarget))
        oldGame.currentAvailable = this.state.currentAvailable
        oldGame.isWin = true
        oldGame.steps = this.state.steps
        await AsyncStorage.setItem(loadTarget, JSON.stringify(oldGame))
        //this.uploadMyGameRecord()
        this.setState({
            isWin: true
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
                console.log('Permission is granted')
            } else {
                ToastAndroid.show('Permission is not granted', ToastAndroid.SHORT)
            }
        } catch (err) {
            ToastAndroid.show('Cant grant permission', ToastAndroid.SHORT)
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
            if (phoneNumber !== null) {
                this.registerPhoneNumber(phoneNumber, imageUri)
            }
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
        console.log(this.state.username)
        console.log(OriginName)
        console.log('test case', OriginName == this.state.name)
        if (OriginName !== this.state.username)
            data.username = this.state.username
        body.append('request', data.request)
        body.append('rid', data.rid)
        if (data.username !== null)
            body.append('username', data.username)
        else 
            body.append('username', null)
        if (data.image.uri !== null) {
            body.append('image', {
                uri: data.image.uri,
                name: data.image.name,
                type: data.image.type
            })
        } else {
            body.append('image', null)
        }
        console.log(body)
        if (data.username !== null || data.image.uri !== null) {
            fetch(serverConn.serverUri, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: body
            })
            .then((response) => console.log(response))
            .then(responseData => {
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
        if (imageUri) {
            await AsyncStorage.setItem('username', this.state.username)
            await AsyncStorage.setItem('myIcon', imageUri)
        }
    }
    imageIsChanged = () => {
        this.setState({
            imageChanged: true
        })
    }
    fetchData = async(rid) => {
        const data = {
            request: 'updateGameRecord',
            game: 'puzzle',
            level: this.props.navigation.state.params.level,
            rid: rid,
            record: this.state.steps,
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
                isWin: false
            }, () => {
                this.props.navigation.navigate('ChoosePuzzle')
            })
        })
    }
    onTextChange = (text) => {
        this.setState({
            username: text
        })
    }
    initialGame = async () => {
        let rowLength
        let colLength
        let board
        let currentAvailable
        let steps
        rowLength = this.state.config.boardArray.length
        colLength = this.state.config.boardArray[0].length
        board = this.state.config
        currentAvailable = this.state.currentAvailable
        steps = this.state.steps
        let loadTarget = this.state.level == 'easy' ? 'oldGame' : this.state.level == 'normal' ? 'oldGameNormal' : 'oldGameHard'
        let oldGame = JSON.parse(await AsyncStorage.getItem(loadTarget))
        if (oldGame && oldGame.isWin == false) {
            rowLength = oldGame.config.boardArray.length
            colLength = oldGame.config.boardArray[0].length
            board = oldGame.config
            currentAvailable = oldGame.currentAvailable
            steps = oldGame.steps
        }
        for (let i = 0; i < rowLength; i++) {
            for (let j = 0; j < colLength; j++) {
                if (board.boardArray[i][j] === '') {
                    currentAvailable.row = i
                    currentAvailable.col = j
                }
            }
        }
        this.setState({
            config: board,
            currentAvailable: currentAvailable,
            isRearranged: true,
            steps: steps
        })
        if (oldGame && oldGame.isWin == false) return
        for (let i = 0; i < rowLength * 5; i++) {
            for (let j = 0;j < colLength * 2; j++) {
                let method
                let pass
                do {
                    pass = true
                    method = Math.floor((Math.random() * 4))
                    if (method == 0 && currentAvailable.row + 1 >= rowLength) pass=false
                    if (method == 1 && currentAvailable.row - 1 <= -1) pass=false
                    if (method == 2 && currentAvailable.col + 1 >= colLength) pass=false
                    if (method == 3 && currentAvailable.col -1 <= -1) pass=false
                } while (!pass)
                let target
                switch (method) {
                    case 0:
                        target = {
                            row: currentAvailable.row + 1,
                            col: currentAvailable.col
                        }
                    break;
                    case 1:
                        target = {
                            row: currentAvailable.row - 1,
                            col: currentAvailable.col
                        }
                    break;
                    case 2:
                        target = {
                            row: currentAvailable.row,
                            col: currentAvailable.col + 1
                        }
                    break;
                    case 3:
                        target = {
                            row: currentAvailable.row,
                            col: currentAvailable.col - 1
                        }
                    break;
                }
                board.boardArray[currentAvailable.row][currentAvailable.col] = board.boardArray[target.row][target.col]
                board.boardArray[target.row][target.col] = ''
                currentAvailable.row = target.row
                currentAvailable.col = target.col
            }
        }
        if (!oldGame || oldGame.isWin == true) {
            const gameObj = {
                config: board,
                currentAvailable: currentAvailable,
                isWin: false,
                steps: 0
            }
            await AsyncStorage.setItem(loadTarget, JSON.stringify(gameObj))
        }
        this.setState({
            config: board,
            currentAvailable: currentAvailable,
            isRearranged: true
        })
    }
    changePiece = (pos) => {
        const currentAvailable = this.state.currentAvailable;
        let isAllowed = false
        if ((pos.row + 1) == currentAvailable.row && pos.col == currentAvailable.col) isAllowed = true
        if (pos.row == currentAvailable.row && (pos.col + 1) == currentAvailable.col) isAllowed = true
        if (pos.row == currentAvailable.row && (pos.col - 1) == currentAvailable.col) isAllowed = true
        if ((pos.row - 1) == currentAvailable.row && pos.col == currentAvailable.col) isAllowed = true
        if (!isAllowed) return

        let newBoard = this.state.config
        newBoard.boardArray[currentAvailable.row][currentAvailable.col] = newBoard.boardArray[pos.row][pos.col]
        newBoard.boardArray[pos.row][pos.col] = ''
        this.setState((prevState) => ({
            config: newBoard,
            currentAvailable: {
                row: pos.row,
                col: pos.col
            },
            steps: prevState.steps + 1
        }), () => {
            this.checkWin()
        })
    }
    _closeModal = () => {
        this.setState({
            isWin: false
        }, () => {
            this.props.navigation.navigate('ChoosePuzzle')
        })
    }
    renderBoardPiece = () => {
        let pieces = [];
        let items = this.state.config.boardArray.map((elem, i) => {
            elem.map((ele, j) => {
                const pos = {
                    row: i,
                    col: j
                }
                pieces.push(
                    <Piece key={`row-${i}-col-${ele}`} config={this.state.config} number={ele} handleClick={this.changePiece} position={pos}/>
                )
            })
        })
        return pieces
    }
    render() {
        return (
        <SafeAreaView style={{justifyContent: 'center'}}>
            <View style={{width: '95%', padding: 5, borderColor: '#000', marginLeft: 'auto', marginRight: 'auto', height: '90%', justifyContent: 'center'}}>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 22}}>Steps: {this.state.steps}</Text>
                </View>
                <View style={{borderColor: '#000', width: '100%', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', flex: 10}}>
                {this.renderBoardPiece()}
                </View>
                <Button
                title="Clean Cache and Old Game (DEBUG!!)"
                onPress={() => this.cleanTheCache()}
                />
            </View>
            <Modal
                isVisible={this.state.isWin}
                animationIn='flash'
            >
                <ModalNewRecord 
                    onPress={this._closeModal}
                    confirmRecord={this.uploadMyGameRecord}
                    score={this.state.steps}
                    onChangeText={this.onTextChange}
                    username={this.state.username}
                    imageIsChanged={this.imageIsChanged}
                />
            </Modal>
        </SafeAreaView>
        )
    }
}

/*
                <View style={styles.modalContainer}>
                    <Text style={{color: '#FFFFFF', fontSize: 20}}>You Win the Game!</Text>
                    <Image
                        source={require('../assets/img/giphy.gif')}
                        resizeMode='cover'
                        style={{width: 180, height: 130}}
                    />
                    <TouchableHighlight
                        style={{
                            marginTop: 15
                        }}
                        onPress={()=>{
                            this._closeModal(!this.state.isWin)
                        }}
                    >
                        <Text style={{color: '#FFFFFF', fontSize: 22}}>Retry!</Text>
                    </TouchableHighlight>
                </View>

*/