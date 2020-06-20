import {
  Appbar,
  Provider,
  DataTable,
  Card,
  Paragraph,
  Title,
  Button,
} from 'react-native-paper';
import React, {Component} from 'react';
import {View, Text, ScrollView, Linking, StyleSheet} from 'react-native';

const faqList = require('../faqs.json');

export class InfoScreen extends Component {
  dialogFlowUrl = 'https://dialogflow.com/';
  qnaMakerUrl = 'https://www.qnamaker.ai/';

  renderDataTableRows() {
    const rows = faqList.map(faq => (
      <DataTable.Row>
        <DataTable.Cell onPress={() => Linking.openURL(faq.url)}>
          {faq.title}
        </DataTable.Cell>
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
          <ScrollView>
            <Card style={infoStyle.card}>
              <Card.Cover
                source={require('../img/dialogflow.png')}
                style={infoStyle.dialogflowImage}
                onPress={() => Linking.openURL(this.dialogFlowUrl)}
              />
              <Card.Title
                title="Dialogflow von Google"
                onPress={() => Linking.openURL(this.dialogFlowUrl)}
              />
              <Card.Content>
                <Text>
                  Der Chatbot, der THM Assistent, wurde mit Google Dialogflow
                  erstellt und wurde mit Fragen und Antworten nach maschinellen
                  Lernen trainiert. Dadurch erkennt der Bot auch leicht
                  unformulierte Fragen, die er vorher noch nicht kannte.
                </Text>
              </Card.Content>
            </Card>

            <Card style={infoStyle.card}>
              <Card.Title
                title="QnA Maker von Microsoft"
                onPress={() => Linking.openURL(this.qnaMakerUrl)}
              />
              <Card.Content>
                <Text>
                  QnA Maker von Microsoft bietet die gleiche Funktionalität wie
                  bei Dialogflow. QnA Maker wurde jedoch nur für das Durchsuchen
                  von Fragen und Antworten einer FAQ-Webseite genutzt. Diese
                  Fragen und Antworten wurden in Dialogflow importiert.
                </Text>
              </Card.Content>
            </Card>

            <Card style={infoStyle.card}>
              <Card.Title title="THM Assistent" />
              <Card.Content>
                <Text>
                  Neben Smalltalk hat der THM Assistent zusätzlich Fragen und
                  Antworten aus den folgenden Webseiten der THM bekommen.
                </Text>
              </Card.Content>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Webseiten</DataTable.Title>
                </DataTable.Header>
                {this.renderDataTableRows()}
              </DataTable>
            </Card>
          </ScrollView>
        </View>
      </Provider>
    );
  }
}

const infoStyle = StyleSheet.create({
  card: {
    margin: 10,
  },
  dialogflowImage: {
    aspectRatio: 2.9,
    height: undefined,
    width: '100%',
  },
});
