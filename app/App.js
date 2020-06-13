import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Config from 'react-native-config';
import uuid from 'react-native-uuid';

export default class MyApp extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));


    const importData = async () => {
      try {
        console.log('start storing data');

        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);

        console.log('import');

        return result.map(req => JSON.parse(req)).forEach(console.log);
      } catch (error) {
        console.error(error);
      }
    };

    importData().then(data => console.log(data));

    const apiKey = Config.API_KEY;
    const url = Config.API_URL;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `EndpointKey ${apiKey}`,
      },
      body: JSON.stringify({
        question: messages[0].text,
      }),
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, {
            _id: uuid.v1(),
            text: data.answers[0].answer,
            createdAt: new Date(),
            user: {
              _id: 2,
            },
          }),
        }));

        let _storeData = async () => {
          try {
            console.log('store item');
            console.log(messages);
            await AsyncStorage.setItem(new Date(), 'hallo');
          } catch (error) {
            // Error saving data
          }
        };

        _storeData().then(d => console.log(d));
      });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
