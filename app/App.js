import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Config from 'react-native-config';

export default class MyApp extends Component {
  constructor() {
    super();

    this.state = {
      number: 0,
      answer: 'Hallo',
    };
  }

  onPressButton() {
    const newNumber = this.state.number + 1;
    this.setState({number: newNumber});

    const apiKey = Config.API_KEY;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `EndpointKey ${apiKey}`,
      },
      body: JSON.stringify({
        question: 'Ich habe Prüfungsangst, wie soll das vonstatten gehen?',
      }),
    };

    fetch(
      'https://qna-thm-service.azurewebsites.net/qnamaker/knowledgebases/bf3b2c41-215c-428b-9cff-1a11ea0a3789/generateAnswer',
      requestOptions,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({answer: data.answers[0].answer});
      });
  }
  render() {
    return (
      <View style={myStyles.myContainer}>
        <Text style={myStyles.myText}>{'Hallo, drücke diesen Button'}</Text>
        <Button title="Button" onPress={this.onPressButton.bind(this)} />
        <Text>{this.state.number}</Text>
        <Text>{this.state.answer}</Text>
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
