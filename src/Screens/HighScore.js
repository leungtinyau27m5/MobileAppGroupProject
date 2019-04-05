import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    BackHandler,
    PermissionsAndroid,
    AsyncStorage,
    ToastAndroid
} from 'react-native'
import { serverConn } from '../server/config'
import DeviceInfo from 'react-native-device-info'
import Contacts from 'react-native-contacts'

class HeadBoard extends Component {
    render() {
        //console.error(this.props)
        return (
            <View style={{
                paddingTop: 15,
                flex: 1,
                backgroundColor: '#FFBC00',
            }}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 28,
                        color: '#FFF',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        High Score
                    </Text>
                </View>
                <View style={{
                    marginTop: 25,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                }}>
                    <View style={{
                        flex: 1, 
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 24,
                            color: '#FFF'
                        }}>th</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text>Avatar</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 24,
                            color: '#FFF'
                        }}>pts</Text>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                }}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={[ this.props.isGlobal ? {backgroundColor: '#FFF'} : styles.categoryBg,
                        styles.tabs, {
                            borderBottomColor: '#FFF', borderBottomWidth: 1
                        }]}
                        onPress={() => this.props.handleOnClickEvent(false, false, '0')}
                    >
                        <Text style={[styles.tabsText, this.props.isGlobal ? {color: '#757575'} : {color: '#FFF'}]}>
                            Freinds
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ this.props.isGlobal ? styles.categoryBg : {backgroundColor: '#FFF'},
                        styles.tabs, {
                            borderBottomColor: '#FFF', borderBottomWidth: 1
                    }]}
                        onPress={() => this.props.handleOnClickEvent(true, false, '0')}
                    >
                        <Text style={[styles.tabsText, this.props.isGlobal ? {color: '#FFF'} : {color: '#757575'}]}>
                            Global
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.tabs, !this.props.isGlobal ? !this.props.isPuzzle ? styles.memoryBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(false, false, '0')}
                    >
                        <Text style={[styles.tabsText, !this.props.isGlobal ? !this.props.isPuzzle ? {color: '#FFF'} : {color: '#757575'} : {color: '#757575'}]}>
                            Memory
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabs, !this.props.isGlobal ? this.props.isPuzzle ? styles.puzzleBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(false, true, '1')}
                    >
                        <Text style={[styles.tabsText, !this.props.isGlobal ? this.props.isPuzzle ? {color: '#FFF'} : {color: '#757575'} : {color: '#757575'}]}>
                            Puzzle
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabs, this.props.isGlobal ? !this.props.isPuzzle ? styles.memoryBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(true, false, '0')}
                    >
                        <Text style={[styles.tabsText, this.props.isGlobal ? !this.props.isPuzzle ? {color: '#FFF'} : {color: '#757575'} : {color: '#757575'}]}>
                            Memory
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabs, this.props.isGlobal ? this.props.isPuzzle ? styles.puzzleBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(true, true, '1')}
                    >
                        <Text style={[styles.tabsText, this.props.isGlobal ? this.props.isPuzzle ? {color: '#FFF'} : {color: '#757575'} : {color: '#757575'}]}>
                            Puzzle
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}
//F1F4F6
class UserRecords extends Component {
    render() {
        return (
            <View style={{
                flex: 1, 
                width: this.props.width,
                backgroundColor: this.props.backgroundColor,
                height: 65,
                borderColor: '#FFF',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingHorizontal: 25
            }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 23}}>{this.props.data.rank}</Text>
                </View>
                <View style={{flex: 4, justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text>avatar</Text>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>{this.props.data.username}</Text>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={{fontSize: 23}}>{this.props.data.score}</Text>
                </View>
            </View>
        )
    }
}
export default class HighScore extends Component {
    constructor(props) {
        super()
        this.state = {
            phoneNumber: null,
            rid: null,
            contacts: null,
            category: {
                isGlobal: false,
                isPuzzle: false,
                puzzleLevel: '0'
            },
            currentTabs: null,
            data: {
                friend: {
                    memory: [
                    ],
                    puzzle: {
                        easy: [],
                        normal: [],
                        hard: [],
                    }
                },
                global: {
                    memory: [
                    ],
                    puzzle: {
                        easy: [],
                        normal: [],
                        hard: [],
                    }
                }
            },
        }
        this.scrollViewOfRecords = null
        this._getData()
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomePage)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomePage)
    }
    backToHomePage = () => {
        this.props.navigation.navigate('Home')
        return true
    }
    _getData = async() => {
        const rid = await AsyncStorage.getItem('rid')
        const username = await AsyncStorage.getItem('username')
        const myIcon = await AsyncStorage.getItem('myIcon')
        const data = {
            rid: rid,
            username: username,
            myIcon: myIcon,
            contacts: null
        }
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'Find your friend Here !'
            }
        ).then(() => {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                    ToastAndroid.show('Access is deined!', ToastAndroid.SHORT)
                } else {
                    data.contacts = contacts
                    this.setState({
                        rid: data.rid,
                        username: data.username,
                        myIcon: data.myIcon,
                        contacts: contacts
                    }, () => {
                        this._fetchData(data)
                    })
                }
            })
        })
        //console.log('contacts : ', data.contacts)
    }
    _fetchData = async(localData) => {
        let myContacts = []
        localData.contacts.forEach(element => {
            myContacts.push(element.phoneNumbers[0].number)
        });
        const data = {
            request: 'queryGameRecord',
            rid: localData.rid,
            contacts: myContacts
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
        //.then((response) => console.log(response))
        .then(responseData => {
            this._storeData(responseData)
        })
        .catch((error) => {
            ToastAndroid.show('Fetch Request Failed', ToastAndroid.LONG)
            console.log("server request Error", error)
        })
        .done()
    }
    _storeData = async(data) => {
        console.log(data)
        this.setState({
            data: {
                friend: {
                    memory: data.friend.memory,
                    puzzle: {
                        easy: data.friend.puzzle.easy,
                        normal: data.friend.puzzle.normal,
                        hard: data.friend.puzzle.hard,
                    }
                },
                global: {
                    memory: data.global.memory,
                    puzzle: {
                        easy: data.global.puzzle.easy,
                        normal: data.global.puzzle.normal,
                        hard: data.global.puzzle.hard,
                    }
                }
            }
        }, () => {
            console.log(this.state)
        })
    }
    handleOnClickEvent = (g, p, l) => {
        const screenWidth = Dimensions.get('window').width
        let num = {
            x: 0,
            y: 0
        }
        if (!g && !p && l == '0') num.x = 0
        if (!g && p && l == '1') num.x = screenWidth
        if (!g && p && l == '2') num.x = screenWidth * 2
        if (!g && p && l == '3') num.x = screenWidth * 3
        if (g && !p && l == '0') num.x = screenWidth * 4
        if (g && p && l == '1') num.x = screenWidth * 5
        if (g && p && l == '2') num.x = screenWidth * 6
        if (g && p && l == '3') num.x = screenWidth * 7
        this.scrollViewOfRecords.scrollTo({
            x: num.x,
            y: 0,
            animated: true
        })
        this.setState({
            category: {
                isGlobal: g,
                isPuzzle: p,
                puzzleLevel: l
            }
        })
    }
    scrollingEvent = (event) => {
        const num = Math.floor(event.nativeEvent.contentOffset.x)
        console.log(num)
        const screenWidth = Dimensions.get('window').width
        if (num == 0) {
            this.setState({
                category: {
                    isGlobal: false,
                    isPuzzle: false,
                    puzzleLevel: '0'
                }
            })
        } else if(num <= screenWidth) {
            console.log('stage 1')
            this.setState({
                category: {
                    isGlobal: false,
                    isPuzzle: true,
                    puzzleLevel: '1'
                }
            })
        } else if(num <= screenWidth * 2) {
            console.log('stage 2')
            this.setState({
                category: {
                    isGlobal: false,
                    isPuzzle: true,
                    puzzleLevel: '2'
                }
            })
        } else if(num <= screenWidth * 3) {
            console.log('stage 3')
            this.setState({
                category: {
                    isGlobal: false,
                    isPuzzle: true,
                    puzzleLevel: '3'
                }
            })
        } else if(num <= screenWidth * 4) {
            console.log('stage 4')
            this.setState({
                category: {
                    isGlobal: true,
                    isPuzzle: false,
                    puzzleLevel: '0'
                }
            })
        } else if (num <= screenWidth * 5) {
            console.log('stage 5')
            this.setState({
                category: {
                    isGlobal: true,
                    isPuzzle: true,
                    puzzleLevel: '1'
                }
            })
        } else if (num <= screenWidth * 6) {
            console.log('stage 6')
            this.setState({
                category: {
                    isGlobal: true,
                    isPuzzle: true,
                    puzzleLevel: '2'
                }
            })
        } else if (num <= screenWidth * 7) {
            console.log('stage 7')
            this.setState({
                category: {
                    isGlobal: true,
                    isPuzzle: true,
                    puzzleLevel: '3'
                }
            })
        }
    }
    appendDataInTabsPage = () => {
        let newArray = []
        const width = Dimensions.get('window').width
        for (let i = 0; i < 8; i++) {
            let data
            let rows = []
            switch (i) {
                case 0:
                    data = this.state.data.friend.memory
                break;
                case 1:
                    data = this.state.data.friend.puzzle.easy
                break;
                case 2:
                    data = this.state.data.friend.memory.normal
                break;
                case 3:
                    data = this.state.data.friend.puzzle.hard
                break;
                case 4:
                    data = this.state.data.global.memory
                break;
                case 5:
                    data = this.state.data.global.puzzle.easy
                break;
                case 6:
                    data = this.state.data.global.puzzle.normal
                break;
                case 7:
                    data = this.state.data.global.puzzle.hard
                break;
            }
            if (data) {
                data.forEach((element, index) => {
                    rows.push(
                        <UserRecords
                            key={index}
                            width={width}
                            data={element}
                            backgroundColor={index % 2 == 0 ? '#FFF' : '#F1F4F6'}
                        />
                    )
                });
            }
            newArray.push(
                <ScrollView key={i} style={{width: width}}>
                    {rows}
                </ScrollView>
            )
        }
        return newArray
    }
    render() {
        return (
            <View style={{flex: 2}}>
                <HeadBoard
                    isGlobal={this.state.category.isGlobal}
                    isPuzzle={this.state.category.isPuzzle}
                    handleOnClickEvent={this.handleOnClickEvent}
                />
                <View style={{flex: 2}}>
                    <View style={[{flexDirection: 'row', height: 45}, this.state.category.isPuzzle ? {display: 'flex'} : {display: 'none', flex: 0}]}>
                        <TouchableOpacity style={[styles.tabs, {justifyContent: 'center'}, this.state.category.puzzleLevel == '1' ? {backgroundColor: '#9BC746'} : {backgroundColor: '#E4F7F6'}]}
                        onPress={() => this.handleOnClickEvent(this.state.category.isGlobal, true, '1')}
                        >
                            <Text style={this.state.category.puzzleLevel == '1'? {color: '#FFF'} : {color: '#767676'}}>Easy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabs, {justifyContent: 'center'}, this.state.category.puzzleLevel == '2' ? {backgroundColor: '#FFC101'} : {backgroundColor: '#E4F7F6'}]}
                        onPress={() => this.handleOnClickEvent(this.state.category.isGlobal, true, '2')}
                        >
                            <Text style={this.state.category.puzzleLevel == '2'? {color: '#FFF'} : {color: '#767676'}}>Normal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabs, {justifyContent: 'center'}, this.state.category.puzzleLevel == '3' ? {backgroundColor: '#FF3527'} : {backgroundColor: '#E4F7F6'}]}
                        onPress={() => this.handleOnClickEvent(this.state.category.isGlobal, true, '3')}
                        >
                            <Text style={this.state.category.puzzleLevel == '3'? {color: '#FFF'} : {color: '#767676'}}>Hard</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        ref={(scrollView) => this.scrollViewOfRecords = scrollView}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={true}
                        scrollIndicatorInsets={{top: 10, Left: 10, bottom: 10, right: 10}}
                        scrollEventThrottle={16}
                        onMomentumScrollEnd={this.scrollingEvent}
                    >
                        {this.appendDataInTabsPage()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tabs: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderLeftColor: '#FFF',
        borderLeftWidth: 1,
    },
    tabsText: {
        fontSize: 18
    },
    categoryBg: {
        backgroundColor: '#9BC746'
    },
    gameBg: {
        backgroundColor: '#F9A427'
    },
    memoryBg: {
        backgroundColor: '#4895A1',
    },
    puzzleBg: {
        backgroundColor: '#F05A71'
    }
})
