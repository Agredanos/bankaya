import React, { Component } from 'react';
import {View,Text,Platform,ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { heightPercentageToDP,widthPercentageToDP } from '../lib/dimensionScreen';
export default class Loader extends Component {
    static propTypes = {
        blnVisible : PropTypes.bool
    };
    constructor(props) {
        super(props);
    }
    render(){
        if(this.props.blnVisible == true){
            return (
                <View style={{position: 'absolute', width: widthPercentageToDP('100%'), height: heightPercentageToDP('100%'), top:0, left:0, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems:'center'}}>
                    <ActivityIndicator
                        color={'red'}
                        size={Platform.OS == 'android' ? heightPercentageToDP('8%') : 'large'}
                    />
                </View>
            )
        }else{
            return null
        }
    }
}