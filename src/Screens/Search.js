import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView
} from 'react-native'

import {
    Col,
    Row,
    Grid
} from 'react-native-easy-grid'

import { Items } from '../Components/Items'
import { ItemBox } from '../Components/ItemBox'

export default class Search extends Component {
    constructor(props) {
        super()
        this.state = {
            allItems: props.navigation.state.params.allItems
        }
        this._renderRows = this._renderRows.bind(this)
    }
    _renderRows = () => {
        let allItems = this.state.allItems
        let renderElem = allItems.map((element, i) => {
            return (
                <ItemBox
                    key={`item-box-${i}`}
                    item={element}
                    handleClick={ this.props.screenProps.handleClick }
                />
            )
        })
        return renderElem
    }
    render() {
        return(
            <SafeAreaView
                style={{
                    flex: 1,
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
            </SafeAreaView>
        )
    }
}
//{ this._generateRows() }</Grid>
const styles = StyleSheet.create({
    aGrid: {
        backgroundColor: '#FF00FF',
        borderWidth: 2,
        borderColor: '#000000'
    }
})