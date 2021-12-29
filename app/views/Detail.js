import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ActionCreators} from '../actions/index';
import {bindActionCreators} from 'redux';
import {Navigation} from 'react-native-navigation';
import {View,StyleSheet,Text,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { heightPercentageToDP, widthPercentageToDP } from '../lib/dimensionScreen';
import { Icon } from 'react-native-elements';
import Loader from '../components/Loader';
import ImageBlurLoading from 'react-native-image-blur-loading';
import Api from '../lib/api';
import { objRouteApi } from '../lib/globalVariablesRoute';
class Detail extends Component{
    static propTypes = {
        componentId: PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            objInfoPokemon : null,
            blnLoader : false,
            arraySpecies : [],
            arrayStats :[],
            arrayMove :[]
        }
    }
    async componentDidMount(){
        this.setState({
            objInfoPokemon : this.props.objInfoPokemon,
            arrayStats : this.props.objInfoPokemon['stats']
        })
        let objResponseSpecies = await this.fnGetSpecies(this.props.objInfoPokemon['id']);
        let objResponseMove = await this.fnGetMove(this.props.objInfoPokemon['id']);
        let arrayMoveTemp = objResponseMove.flavor_text_entries.filter(item => item['language']['name'] == 'es')[0]
        this.setState({
            arraySpecies : objResponseSpecies.flavor_text_entries.filter(item => item['language']['name'] == 'es'),
            arrayMove : [arrayMoveTemp]
        })
    }
    fnGetSpecies(strId){
        return new Promise((resolve,reject)=>{
            Api.get(`${objRouteApi.strGetPokemonSpecies}${strId}`,null).then((response)=>{
                if(JSON.stringify(response) != '{}'){
                    resolve(response);
                }else{
                    resolve(null)
                }
            })
        })
    }

    fnGetMove(strId){
        return new Promise((resolve,reject)=>{
            Api.get(`${objRouteApi.strGetPokemonMove}${strId}`,null).then((response)=>{
                if(JSON.stringify(response) != '{}'){
                    resolve(response);
                }else{
                    resolve(null)
                }
            })
        })
    }

    fnRenderImage(){
        if(this.state.objInfoPokemon != null){
            return(
                <View style={localStyles.jsnViewImage}>
                    <ImageBlurLoading
                        thumbnailSource={{ uri: this.state.objInfoPokemon.sprites.other['official-artwork']['front_default']}}
                        source={{ uri: this.state.objInfoPokemon.sprites.other['official-artwork']['front_default'] }}
                        style={{ width: undefined, height: undefined, flex: 1,resizeMode: 'contain'}}
                    />
                </View>
            )
        }
    }
    fnRenderSectionOne(){
        if(this.state.objInfoPokemon != null){
            return(
                <View style={localStyles.jsnSectionOne}>
                    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>Id</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.objInfoPokemon.id}`}</Text>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>Altura</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.objInfoPokemon.height / 10} m`}</Text>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>Peso</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.objInfoPokemon.weight / 10} kg`}</Text>
                        </View>
                        
                    </View>
                    
                </View>
            )
        }
    }
    fnRenderStats(){
        if(this.state.arrayStats.length > 0){
            return(
                <View style={[localStyles.jsnSectionOne,{marginTop:10}]}>
                    <View style={{justifyContent:'space-between', flexDirection:'row', marginBottom:20}}>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>PS</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.arrayStats[0]['base_stat']}%`}</Text>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>Ataque</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.arrayStats[1]['base_stat']}%`}</Text>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>Defensa</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.arrayStats[2]['base_stat']}%`}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>{'Ataque \nEspecial'}</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.arrayStats[3]['base_stat']}%`}</Text>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>{'Defensa \nEspecial'}</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.arrayStats[4]['base_stat']}%`}</Text>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <Text style={[localStyles.objTextTitle]}>Velocidad</Text>
                            <Text style={[localStyles.objTextSubTitle]}>{`${this.state.arrayStats[5]['base_stat']}%`}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
    fnRenderSpecies(){
        if(this.state.arraySpecies.length > 0){
            let arraTemp = this.state.arraySpecies;
            let render = arraTemp.map((item,index) => {
                return (
                <View style={{alignItems:'flex-start', flexDirection:'row', padding:10, paddingRight:30}}>
                    <Text style={[localStyles.objTextTitle,{textAlign:'justify'}]}>{`${index + 1}.- `}</Text>
                    <Text style={[localStyles.objTextSubTitle]}>{`${item['flavor_text']}`}</Text>
                </View>
                )
            })
            return(
                <View style={[localStyles.jsnSectionOne,{marginTop:10}]}>
                    <Text style={[localStyles.objTextTitle,{textAlign:'justify'}]}>{`Especie`}</Text>
                    {render}
                </View>
            )
        }
    }

    fnRenderMove(){
        if(this.state.arrayMove.length > 0){
            let arraTemp = this.state.arrayMove;
            let render = arraTemp.map((item,index) => {
                return (
                <View style={{alignItems:'flex-start', flexDirection:'row', padding:10, paddingRight:30}}>
                    <Text style={[localStyles.objTextTitle,{textAlign:'justify'}]}>{`${index + 1}.- `}</Text>
                    <Text style={[localStyles.objTextSubTitle]}>{`${item['flavor_text']}`}</Text>
                </View>
                )
            })
            return(
                <View style={[localStyles.jsnSectionOne,{marginTop:10}]}>
                    <Text style={[localStyles.objTextTitle,{textAlign:'justify'}]}>{`Movimientos`}</Text>
                    {render}
                </View>
            )
        }
    }
    render(){
        return(
            <SafeAreaView style={[globalStyles.objBackgroud,{justifyContent:'space-between'}]}>
                <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',height:heightPercentageToDP('6%'),width:widthPercentageToDP('100%'), justifyContent:'space-between',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>Navigation.pop(this.props.componentId)}>
                        <Icon
                            name='left'
                            type='antdesign'
                            color='#000000'
                            size ={heightPercentageToDP('4%')}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize:widthPercentageToDP('5%'),fontWeight:'bold'}}>{this.state.objInfoPokemon != null ? this.state.objInfoPokemon['name'] : ''}</Text>
                    <Icon
                        name='pokeball'
                        type='material-community'
                        color='#000000'
                        size ={heightPercentageToDP('4%')}
                    />
                    
                </View>
                <ScrollView>
                        {this.fnRenderImage()}
                        {this.fnRenderSectionOne()}
                        {this.fnRenderStats()}
                        {this.fnRenderSpecies()}
                        {this.fnRenderMove()}
                    </ScrollView>
                <Loader blnVisible={this.state.blnLoader}/>
            </SafeAreaView>
        );
    }
}
const localStyles = StyleSheet.create({
    objTextTitle : {
        fontSize : widthPercentageToDP('5%'),
        fontWeight : '600'
    },
    objTextSubTitle : {
        fontSize : widthPercentageToDP('4%')
    },
    jsnViewImage :{
        width:widthPercentageToDP('100%'),
        height:heightPercentageToDP('30%')
    },
    jsnSectionOne : {
        width:widthPercentageToDP('100%'),
        backgroundColor:'#FFFFFF', 
        padding:10, 
        borderRadius: 10
    }
});
function mapStateToProps(state){
    return {}
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators,dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);