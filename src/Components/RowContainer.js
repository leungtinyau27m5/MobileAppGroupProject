import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'

import {
    Row,
    Col,
} from 'react-native-easy-grid'

import { Items } from './Items'

//development test, not in use finally
export class RowContainer extends Component {
    constructor(props) {
        super()
    }
    _renderCols = () => {

    }
    render() {
        return (
            <View>
                { this._renderCols() }
            </View>
        )
    }
}