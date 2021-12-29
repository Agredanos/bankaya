import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import Principal from '../views/Principal';
import Detail from '../views/Detail';
export function fnRegisterScreens(store){
    Navigation.registerComponent(`Principal`, () => (props) =>
        <Provider store={store}>
            <Principal {...props} />
        </Provider>,
    () => Principal);

    Navigation.registerComponent(`Detail`, () => (props) =>
        <Provider store={store}>
            <Detail {...props} />
        </Provider>,
    () => Detail);
}