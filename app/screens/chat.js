import {Appbar, Menu, Provider, Text} from 'react-native-paper';
import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import {answerAsync, configureBotAPI} from '../api/BotAPI';
import {retrieveItem, storeItem} from '../api/StorageAPI';
import {View, StyleSheet} from 'react-native';

export class ChatScreen extends Component {
  messagesKey = 'messages';
  viewScore = false;

  constructor() {
    super();

    configureBotAPI();

    this.state = {
      messages: [],
      visible: false,
    };
  }

  componentDidMount() {
    retrieveItem(this.messagesKey).then(messages => {
      if (messages != null) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
      }
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const question = messages[0].text;

    answerAsync(question, result => this.addAnswer(result), error => {});
  }

  addAnswer(result) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, {
        _id: uuid.v1(),
        text: result.answer,
        createdAt: new Date(),
        user: {
          _id: 2,
        },
        score: result.score,
        viewScore: this.viewScore,
      }),
    }));

    storeItem(this.messagesKey, this.state.messages);
  }

  _openMenu = () => this.setState({visible: true});

  _closeMenu = () => this.setState({visible: false});

  _deleteMessages = () => {
    this.setState({messages: [], visible: false});
    storeItem(this.messagesKey, []);
  };

  changeViewScore() {
    this.viewScore = !this.viewScore;
    this.setState({visible: false});
  }

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
              <Menu.Item onPress={this._deleteMessages} title="Löschen" />
              <Menu.Item
                onPress={() => this.props.navigation.navigate('InfoScreen')}
                title="Info"
              />
              <Menu.Item
                title="Score anzeigen"
                onPress={() => this.changeViewScore()}
              />
            </Menu>
          </Appbar.Header>

          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
            renderCustomView={this.renderCustomView}
          />
        </View>
      </Provider>
    );
  }

  renderCustomView = props => {
    var message = props.currentMessage;
    if (message.user._id === 1 || message.viewScore === false) {
      return;
    }

    return (
      <View style={appStyle.messageCustomView}>
        <Text>Score: {message.score}</Text>
      </View>
    );
  };
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
  messageCustomView: {
    minHeight: 20,
    alignItems: 'center',
  },
});
