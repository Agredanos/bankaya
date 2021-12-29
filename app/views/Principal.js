import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ActionCreators} from '../actions/index';
import {bindActionCreators} from 'redux';
import {Navigation} from 'react-native-navigation';
import {View,StyleSheet,Text,SafeAreaView,ScrollView,TouchableOpacity,FlatList,Image} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Card } from 'react-native-elements';
import ImageBlurLoading from 'react-native-image-blur-loading'
import { widthPercentageToDP,heightPercentageToDP } from '../lib/dimensionScreen';
import Loader from '../components/Loader';
import Api from '../lib/api';
import { objRouteApi } from '../lib/globalVariablesRoute';
class Principal extends Component{
    static propTypes = {
        componentId: PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            intPage : 1,
            intGetPokemonInitial :1,
            intGetPokemon :10,
            blnLoader : true,
            arrayPokemons : []
        }
        this.onEndReachedCalledDuringMomentum = true;
    }

    fnGetPokemonInfo(intCount){
        return new Promise((resolve,reject)=>{
            try {
                console.log(intCount);
                Api.get(`${objRouteApi.strGetPokemonInfo}${intCount}`).then((response)=>{
                    if(JSON.stringify(response) != '{}'){
                        this.setState(prevState => ({
                            arrayPokemons: [...prevState.arrayPokemons, response]
                        }),()=>{
                            if(intCount == this.state.intGetPokemon){
                                this.setState({
                                    blnLoader : false
                                })
                            }                           
                        });
                        resolve(true);
                    }else{
                        resolve(null);
                    }
                })
            } catch (error) {
                console.log('fnGetPokemonInfo',error);
                resolve(null);
            }
        })
    }

    async componentDidMount(){
        let intCount = 1;
        while (intCount <= this.state.intGetPokemon) {
            await this.fnGetPokemonInfo(intCount);
            intCount = intCount + 1;
        }
    }

    onEndReached = ({ distanceFromEnd }) => {
        if(!this.onEndReachedCalledDuringMomentum){
            let intCountTemp = this.state.intGetPokemon + 1;
            this.setState({
                intPage : this.state.intPage + 1,
                intGetPokemon : this.state.intGetPokemon * this.state.intPage + 1
            },async ()=>{
                while (intCountTemp <= this.state.intGetPokemon) {
                    await this.fnGetPokemonInfo(intCountTemp);
                    intCountTemp = intCountTemp + 1;
                }
            })
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    fnSendDetail(objInfoPokemon){
        Navigation.push(this.props.componentId,{
            component :{
                name : 'Detail',
                id : 'Detail',
                passProps :{
                    objInfoPokemon : objInfoPokemon
                }
            }
        })
    }

    fnRenderList(item,index){
        return(
            <TouchableOpacity onPress={()=>{this.fnSendDetail(item)}} style={[localStyles.jsnButtom]}>
                <Card containerStyle={localStyles.jsnCard}>
                    <Card.Title>{item['name']}</Card.Title>
                    <Card.Divider />
                    <View>
                        <View style={localStyles.jsnViewImage}>
                            <ImageBlurLoading
                                thumbnailSource={{ uri: item.sprites.other['official-artwork']['front_default'] }}
                                source={{ uri: item.sprites.other['official-artwork']['front_default'] }}
                                style={{ width: undefined, height: undefined, flex: 1,resizeMode: 'contain'}}
                            />
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <SafeAreaView style={[globalStyles.objBackgroud]}>
                <FlatList
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={0.2}
                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    data={this.state.arrayPokemons}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return(
                            this.fnRenderList(item, index)
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Loader blnVisible={this.state.blnLoader}/>
            </SafeAreaView>
        );
    }
}
const localStyles = StyleSheet.create({
    jsnButtom : {width:widthPercentageToDP('50%'),height:heightPercentageToDP('30%'),alignItems:'center',padding:10,marginBottom:10},
    jsnCard : {width:'100%',borderRadius:10},
    jsnViewImage : {width:'100%',height:'80%'}
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
)(Principal);