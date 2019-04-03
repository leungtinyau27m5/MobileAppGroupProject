import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    BackHandler
} from 'react-native'
import { serverConn } from '../server/config'

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
                        onPress={() => this.props.handleOnClickEvent(false, false)}
                    >
                        <Text style={[styles.tabsText, this.props.isGlobal ? {color: '#757575'} : {color: '#FFF'}]}>
                            Friends
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ this.props.isGlobal ? styles.categoryBg : {backgroundColor: '#FFF'},
                        styles.tabs, {
                            borderBottomColor: '#FFF', borderBottomWidth: 1
                    }]}
                        onPress={() => this.props.handleOnClickEvent(true, false)}
                    >
                        <Text style={[styles.tabsText, this.props.isGlobal ? {color: '#FFF'} : {color: '#757575'}]}>
                            Global
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.tabs, !this.props.isGlobal ? !this.props.isPuzzle ? styles.memoryBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(false, false)}
                    >
                        <Text style={[styles.tabsText, !this.props.isGlobal ? !this.props.isPuzzle ? {color: '#FFF'} : {color: '#757575'} : {color: '#757575'}]}>
                            Memory
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabs, !this.props.isGlobal ? this.props.isPuzzle ? styles.puzzleBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(false, true)}
                    >
                        <Text style={[styles.tabsText, !this.props.isGlobal ? this.props.isPuzzle ? {color: '#FFF'} : {color: '#757575'} : {color: '#757575'}]}>
                            Puzzle
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabs, this.props.isGlobal ? !this.props.isPuzzle ? styles.memoryBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(true, false)}
                    >
                        <Text style={[styles.tabsText, this.props.isGlobal ? !this.props.isPuzzle ? {color: '#FFF'} : {color: '#757575'} : {color: '#757575'}]}>
                            Memory
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabs, this.props.isGlobal ? this.props.isPuzzle ? styles.puzzleBg : {backgroundColor: '#FFF'} : {backgroundColor: '#FFF'}]}
                    onPress={() => this.props.handleOnClickEvent(true, true)}
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
            category: {
                isGlobal: false,
                isPuzzle: false
            },
            data: {
                friend: {
                    memory: [
                        {rank: 1, username: 'joe', score: '332/111'},
                        {rank: 2, username: 'joe', score: '332/111'},
                        {rank: 3, username: 'joe', score: '332/111'}
                    ],
                    puzzle: [
                        {rank: 1, username: 'joe', score: '332/111'},
                        {rank: 2, username: 'joe', score: '332/111'},
                        {rank: 3, username: 'joe', score: '332/111'}
                    ]
                },
                global: {
                    memory: [
                        {rank: 2, username: 'joe', score: '332/111'},
                        {rank: 2, username: 'joe', score: '332/111'},
                        {rank: 2, username: 'joe', score: '332/111'},
                    ],
                    puzzle: [
                        {rank: 3, username: 'joe', score: '332/111'},
                        {rank: 3, username: 'joe', score: '332/111'},
                        {rank: 3, username: 'joe', score: '332/111'},
                    ],
                }
            },
        }
        this.scrollViewOfRecords = null
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
    fetchDataFromServer = () => {
        const data = {
            request: 'queryGameRecord'
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
            this._storeData(responseData)
        })
        .catch((error) => {
            console.log("server request Error", error)
        })
        .done()
    }
    _storeData = (res) => {
        console.log(res)
    }
    handleOnClickEvent = (g, p) => {
        const screenWidth = Dimensions.get('window').width
        let num = {
            x: 0,
            y: 0
        }
        if (!g && !p) num.x = 0
        if (!g && p) num.x = screenWidth
        if (g && !p) num.x = screenWidth * 2
        if (g && p) num.x = screenWidth * 3
        this.scrollViewOfRecords.scrollTo({
            x: num.x,
            y: 0,
            animated: true
        })
        this.setState({
            category: {
                isGlobal: g,
                isPuzzle: p
            }
        })
    }
    scrollingEvent = (event) => {
        const num = event.nativeEvent.contentOffset.x
        console.log(num)
        const screenWidth = Dimensions.get('window').width
        console.log(screenWidth)
        if (num == 0) {
            this.setState({
                category: {
                    isGlobal: false,
                    isPuzzle: false
                }
            })
        } else if(num <= screenWidth) {
            this.setState({
                category: {
                    isGlobal: false,
                    isPuzzle: true
                }
            })
        } else if(num <= screenWidth * 2) {
            this.setState({
                category: {
                    isGlobal: true,
                    isPuzzle: false
                }
            })
        } else if(num <= screenWidth * 3) {
            this.setState({
                category: {
                    isGlobal: true,
                    isPuzzle: true
                }
            })
        } else if(num <= screenWidth * 4) {
            this.setState({
                category: {
                    isGlobal: true,
                    isPuzzle: true
                }
            })
        }
    }
    appendDataInTabsPage = () => {
        let newArray = []
        const width = Dimensions.get('window').width
        for (let i = 0; i < 4; i++) {
            let data
            let rows = []
            switch (i) {
                case 0:
                    data = this.state.data.friend.memory
                break;
                case 1:
                    data = this.state.data.friend.puzzle
                break;
                case 2:
                    data = this.state.data.global.memory
                break;
                case 3:
                    data = this.state.data.global.puzzle
                break;
            }
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
            <View style={{flex: 1}}>
                <HeadBoard
                    isGlobal={this.state.category.isGlobal}
                    isPuzzle={this.state.category.isPuzzle}
                    handleOnClickEvent={this.handleOnClickEvent}
                />
                <View style={{flex: 2}}>
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
