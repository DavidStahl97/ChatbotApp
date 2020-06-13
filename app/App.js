import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import {answerAsync} from './api/BotAPI';

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

    const question = messages[0].text;

    answerAsync(question).then(answer =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, {
          _id: uuid.v1(),
          text: answer,
          createdAt: new Date(),
          user: {
            _id: 2,
          },
        }),
      })),
    );
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
