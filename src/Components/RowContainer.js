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

export class RowContainer extends Component {
    constructor(props) {
        super()
    }
    _renderCols = () => {
        const cols = this.props.cols
        const items = this.props.items
        let colsContainer = [];
        for (let i = 0; i < cols; i++) {
            const item = items[i]
            colsContainer.push(

            )
        }
        return colsContainer
    }
    render() {
        return (
            <View>
                { this._renderCols() }
            </View>
        )
    }
}