import {Text} from 'react-native-paper';
import React, {Component} from 'react';
import {StyleSheet, Linking, Dimensions} from 'react-native';
import Image from 'react-native-scalable-image';

// used for reading QnA syntax language and generates the ui components
export class BotMessage extends Component {
  render() {
    const splittedLines = this.props.text.split('\\n');

    // cannot add an image in text component
    const imageRegex = /!\[[^\]]+\]\([^)]+\)/;
    return splittedLines.map(line =>
      imageRegex.test(line) ? (
        this.renderLine(line)
      ) : (
        <Text style={{margin: 10}}>{this.renderLine(line)}</Text>
      ),
    );
  }

  renderLine(line) {
    // check if unordered List (example * Hallo)
    if (/^\*\s/.test(line)) {
      return (
        <Text>
          {'\u2022'}
          {line.replace('* ', '')}
        </Text>
      );
    }

    // check if line is a header (example **Title**)
    if (/\*\*[^\*]+\*\*/.test(line)) {
      return (
        <Text style={messageStyle.header}>
          {this.renderText(line.replace(/\*\*/g, ''))}
        </Text>
      );
    } else {
      return this.renderText(line);
    }
  }

  renderText(line) {
    // check if there is a link in text (example ![ein text](http://hallo.de/image.png) )
    const linkRegex = /(!?\[[^\]]+\]\([^)]+\))/;
    return line
      .split(linkRegex)
      .map(piece =>
        linkRegex.test(piece) ? this.renderLink(piece) : <Text>{piece}</Text>,
      );
  }

  renderLink(link) {
    const title = link.substring(link.indexOf('[') + 1, link.indexOf(']'));
    const secondPart = link.substring(link.indexOf(']') + 2);
    const url = secondPart.substring(0, secondPart.length - 1);

    return link[0] === '!'
      ? this.renderLinkWithImage(title, url)
      : this.renderLinkWithUrl(title, url);
  }

  renderLinkWithUrl(title, url) {
    return (
      <Text style={messageStyle.link} onPress={() => Linking.openURL(url)}>
        {title}
      </Text>
    );
  }

  renderLinkWithImage(title, url) {
    return (
      <Image
        source={{uri: url}}
        width={Dimensions.get('window').width - 100}
        onPress={() => Linking.openURL(url)}
      />
    );
  }
}

const messageStyle = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
  },
  image: {
    width: 100,
  },
});
