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
    AppState
} from 'react-native'

import Modal from 'react-native-modal'
import BackgroundTimer from 'react-native-background-timer'

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
            counting: 90
        }
        this._renderRows = this._renderRows.bind(this)
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
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
    timeOver = () => {
        if (this.state.counting === 0) {
            this.setState({
                gameOver: true,
                modalGameOver: true,
                counting: -1
            })
        }
    }
    componentWillUnmount = async() => {
        AppState.removeEventListener('change', this.props.screenProps.handleAppStateChange);
        BackgroundTimer.clearInterval(this.intervalId)
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
    _closeModal = async (isVisible) => {
        this.setState({
            modalGameOver: isVisible
        })
        this.props.navigation.navigate('SelectGame')
    }
    render() {
        return(
            <SafeAreaView>
                <Modal
                    isVisible={this.state.modalGameOver}
                    animationIn='flash'
                >
                    <View style={styles.modalContainer}>
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>Your Lose the Game!</Text>
                        <Image
                            source={require('../assets/img/giphy.gif')}
                            resizeMode='cover'
                            style={{width: 180, height: 130}}
                        />
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>Your Record is :</Text><Text style={{color: '#FFFFFF', fontSize: 28}}>{this.props.screenProps.showPlayedTime()}</Text>
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