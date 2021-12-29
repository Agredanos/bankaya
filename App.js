/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { createStore, applyMiddleware, compose } from 'redux';
 import thunkMiddleware from 'redux-thunk';
 import logger from 'redux-logger';
 import reducer from './app/reducers';
 import { fnRegisterScreens } from "./app/lib/registerScreens";
 import { Navigation } from 'react-native-navigation';
 function configureStore(initialState) {
   const enhancer = compose(
     applyMiddleware(
       thunkMiddleware,
       logger
     )
   );
   return createStore(reducer, initialState, enhancer);
 }
 const store = configureStore({});
 fnRegisterScreens(store);
 export default class App {
   constructor() {
     this.fnStartApp();
   }
   fnStartApp() {
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setDefaultOptions({
        appStyle: {
          forceTitlesDisplay: true
        },
        topBar: {
          visible: false,
          drawBehind: true,
        },
        layout: {
          orientation: ['portrait']
        }
      });
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'Principal',
                  id:'Principal'
                }
              }
            ]
          }
        }
      });
    });
  }
}