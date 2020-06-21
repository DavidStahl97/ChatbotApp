import {Appbar, Provider, DataTable} from 'react-native-paper';
import React, {Component} from 'react';
import {StyleSheet, Button, View, Text, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: '80%',
        resizeMode: 'contain',
    },
});

export class SplashScreen extends Component {

    constructor(){
        super();

        setTimeout(
            () => { this.props.navigation.replace('ChatScreen') },
            500
        )
        
    };

    render() {
        return (
        <Provider>
                <View style = {styles.container}>
                    <Image source={require("../thm.png")} style={styles.image}/>
                </View>
            </Provider>
        );
    };


}
