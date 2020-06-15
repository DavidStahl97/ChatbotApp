import React, {Component} from 'react';
import {Appbar, Provider} from 'react-native-paper';
import {View, Text} from 'react-native';

export class InfoScreen extends Component {
  render() {
    return (
      <Provider>
        <View>
          <Appbar.Header>
            <Appbar.Content title="Info" />
          </Appbar.Header>

          <Text>Info</Text>
        </View>
      </Provider>
    );
  }
}
