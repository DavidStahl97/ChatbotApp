import React, {Component} from 'react';
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

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: uuid.v1(),
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const apiKey = Config.API_KEY;

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

    fetch(
      'https://qna-thm-service.azurewebsites.net/qnamaker/knowledgebases/bf3b2c41-215c-428b-9cff-1a11ea0a3789/generateAnswer',
      requestOptions,
    )
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
