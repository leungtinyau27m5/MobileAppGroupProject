import React, { Component } from 'react'
import {
    Button,
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native'

export default class Settings extends Component {
    constructor(props) {
        super()
        this.state = {
            playHomeAnima: '1'
        }
    }
    _disableAnimation = async () => {
        try {
            const value = await AsyncStorage.getItem('PlayHomeAnima')
            if (value == null || value == '1') {
                await AsyncStorage.setItem('PlayHomeAnima', '0')
            } else {
                await AsyncStorage.setItem('PlayHomeAnima', '1')
            }
        } catch (e) {
            //console.error(e)
        }
    }
    render() {
        return (
            <View>
                <Text>
                    Settings Page
                </Text>
                <TouchableOpacity 
                    style={[this.state.playHomeAnima == '1' ? styles.enable : styles.disable, styles.button]}
                    onPress={() => this._disableAnimation()}
                >
                    <Text style={styles.buttonText}>Animation in Home Page ?</Text>
                </TouchableOpacity>
                <Button
                    style={styles.button}
                    title="back to Home Page"
                    onPress={() => this.props.navigation.navigate('Home')}
                ></Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        width: 250,
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 85,
    },
    buttonText: {
        fontSize: 25
    },
    enable: {
        backgroundColor: '#22FF22'
    },
    disable: {
        backgroundColor: '#FF2222'
    }
})