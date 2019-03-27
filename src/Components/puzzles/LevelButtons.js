import React, { Component } from 'react'
import {
    TouchableOpacity,
    Image,
    Button,
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class LevelButton extends Component {
    constructor(props) {
        super()
    }
    onClickColor = () => {

    }
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={[styles.touchableButton, {borderColor: '#83BF45'}]} onPress={() => {this.props.onClickFunction('easy'); this.onClickColor('#83BF45');}}>
                    <Text style={[styles.buttonText, {color: '#83BF45'}]}>
                        Easy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touchableButton, {borderColor: '#FFCE44'}]} onPress={() => {this.props.onClickFunction('normal'); this.onClickColor('#FFCE44')}}>
                    <Text style={[styles.buttonText, {color: '#FFCE44'}]}>
                        Normal
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touchableButton, {borderColor: '#DD5246'}]} onPress={() => {this.props.onClickFunction('hard'); this.onClickColor('#DD5246')}}>
                    <Text style={[styles.buttonText, {color: '#DD5246'}]}>
                        Hard
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touchableButton: {
        marginTop: 25,
        width: 180,
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
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: 'monospace'
    },
})