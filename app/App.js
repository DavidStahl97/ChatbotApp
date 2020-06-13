import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import {answerAsync} from './api/BotAPI';
import {retrieveItem, storeItem} from './api/StorageAPI';
import {Header, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, StyleSheet} from 'react-native';

export default class MyApp extends Component {
  messagesKey = 'messages';

  constructor() {
    super();

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    retrieveItem(this.messagesKey).then(messages =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      })),
    );
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const question = messages[0].text;

    answerAsync(question)
      .then(answer =>
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
      )
      .then(() => storeItem(this.messagesKey, this.state.messages));
  }

  render() {
    return (
      <View style={appStyle.container}>
        <Header
          centerComponent={{text: 'THM Assistent', style: {color: '#fff'}}}
          rightComponent={
            <Button icon={<Icon name="more-vert" color="#fff" />} />
          }
          containerStyle={appStyle.header}
        />

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

const appStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 0,
  },
});
