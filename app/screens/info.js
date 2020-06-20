import {Appbar, Provider, DataTable} from 'react-native-paper';
import React, {Component} from 'react';
import {View, Text} from 'react-native';

const faqList = require('../faqs.json');

export class InfoScreen extends Component {
  renderDataTableRows() {
    const rows = faqList.map(faq => (
      <DataTable.Row>
        <DataTable.Cell>{faq.title}</DataTable.Cell>
        <DataTable.Cell>{faq.url}</DataTable.Cell>
      </DataTable.Row>
    ));

    return rows;
  }

  render() {
    return (
      <Provider>
        <View>
          <Appbar.Header>
            <Appbar.Action
              icon="arrow-left"
              onPress={() => this.props.navigation.navigate('ChatScreen')}
              color="#fff"
            />
            <Appbar.Content title="Info" />
          </Appbar.Header>
          <Text>Unterstützte THM-FAQs</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Webseiten</DataTable.Title>
              <DataTable.Title>URL</DataTable.Title>
            </DataTable.Header>

            {this.renderDataTableRows()}
          </DataTable>
        </View>
      </Provider>
    );
  }
}
