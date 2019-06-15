import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import ajax from 'axios';
import { Button } from 'react-native-elements';

export default class DelayNotification extends Component
{
    constructor(props)
    {
        super(props);

        this.state = { notification: undefined }

        ajax('https://www.clsd.k12.pa.us/cms/Tools/OnScreenAlerts/UserControls/OnScreenAlertDialogListWrapper.aspx').then(res =>
        {
            const returnedData = res.data;
            let dataStart = 'tabindex="0"><p>';
            let dataEnd = '</p>';

            let dataBegin = returnedData.substring(returnedData.indexOf(dataStart) + dataStart.length);
            let data = dataBegin.substring(0, dataBegin.indexOf(dataEnd));

            this.setState({notification: data});
        });
    }

    render()
    {
        if(!this.state.notification)
            return null;
        else
        {
            return (
            <View style={{padding: 50, zIndex: 1000, justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute', display: 'flex', backgroundColor: 'white'}}>
                <Text style={{textAlign: 'center', color: 'black', fontSize: 22, marginBottom: 40}}>{this.state['notification']}</Text>
                <Button buttonStyle={{backgroundColor: '#002366', width: 100}} containerStyle={{fontSize: 22}} onPress={() => this.setState({notification: undefined})} type='solid' title='OK'/>
            </View>
            );
        }
    }
}
