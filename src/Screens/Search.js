import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert,
    TouchableHighlight
} from 'react-native'

import Modal from 'react-native-modal'

import { Items } from '../Components/Items'
import { ItemBox } from '../Components/ItemBox'

export default class Search extends Component {
    constructor(props) {
        super()
        this.state = {
            allItems: props.navigation.state.params.allItems,
            life: 5,
            gameOver: false,
            modalGameOver: false
        }
        this._renderRows = this._renderRows.bind(this)
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
    _closeModal(isVisible) {
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