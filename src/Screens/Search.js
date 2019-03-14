import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native'

import {
    Col,
    Row,
    Grid
} from 'react-native-easy-grid'

import { Items } from '../Components/Items'

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
                <Items
                    key={`item-${i}`}
                    turning={element.turning}
                    isReverse={element.isReverse}
                    shape={element.shape}
                    color={element.color}
                />
            )
        })
        /*
        let renderElem = allItems.map((element, i) => {
            let ele = element.map((item, j) => {
                return (
                    <Text>{`${item.shape}    `}</Text>
                )
            })
            return (
                <View 
                    key={`row-${i}`}
                    style={{flexDirection: 'row'}}
                >
                    {ele}
                </View>
            )
        })*/
        return renderElem
    }
    render() {
        return(
            <View
                style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    justifyContent: 'center',
                    padding: 55
                }}
            >
                {this._renderRows()}
            </View>
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