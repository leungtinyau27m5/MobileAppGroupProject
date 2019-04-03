import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

class HeadBoard extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 15
            }}>
                <Text style={{
                    fontSize: 22,
                    color: '#FFF',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    LeaderBoard
                </Text>
                <View style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 20
                }}>
                    <View style={{
                        flex: 1, 
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text>th</Text>
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
                        <Text>pts</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 25,
                    paddingHorizontal: 55,
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity style={{
                        flex: 1
                    }}>
                        <Text>
                            asdf
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
class UserRecords extends Component {
    render() {
        return (
            <View style={{flex: 2}}>
                <Text>
                    User Records
                </Text>
            </View>
        )
    }
}
export default class HighScore extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <HeadBoard
                />
                <UserRecords
                />
            </View>
        )
    }
}