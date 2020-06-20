import {Appbar, Provider, DataTable} from 'react-native-paper';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export class SplashScreen extends Component {

    render() {
        return (
        <Provider>
                <View justifyContent = "center">
                    <Text>
                        Splash
                    </Text>

                </View>
            </Provider>
        );
    }
}
