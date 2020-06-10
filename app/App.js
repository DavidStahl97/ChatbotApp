import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Config from 'react-native-config';

export default class MyApp extends Component {
  constructor() {
    super();

    this.state = {
      number: 0,
    };
  }

  onPressButton() {
    const newNumber = this.state.number + 1;
    this.setState({number: newNumber});

    const key = Config.API_KEY;
  }

  render() {
    return (
      <View style={myStyles.myContainer}>
        <Text style={myStyles.myText}>{'Moin, drücke diesen Button'}</Text>
        <Button title="Button" onPress={this.onPressButton.bind(this)} />
        <Text>{this.state.number}</Text>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  myContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCAA',
  },
  myText: {
    fontSize: 50,
  },
});
