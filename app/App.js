import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import {answerAsync} from './api/BotAPI';
import {retrieveItem, storeItem} from './api/StorageAPI';
import {Appbar, Menu, Provider} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

export default class MyApp extends Component {
  messagesKey = 'messages';

  constructor() {
    super();

    this.state = {
      messages: [],
      visible: false,
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

  _openMenu = () => this.setState({visible: true});

  _closeMenu = () => this.setState({visible: false});

  render() {
    return (
      <Provider>
        <View style={appStyle.container}>
          <Appbar.Header>
            <Appbar.Content title="THM Assistent" />
            <Menu
              visible={this.state.visible}
              onDismiss={this._closeMenu}
              anchor={
                <Appbar.Action
                  icon="dots-vertical"
                  onPress={this._openMenu}
                  color="#fff"
                />
              }>
              <Menu.Item onPress={() => {}} title="Löschen" />
            </Menu>
          </Appbar.Header>

          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </Provider>
    );
  }
}

const appStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});