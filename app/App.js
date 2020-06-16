import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen} from './screens/chat';
import {InfoScreen} from './screens/info';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="InfoScreen" component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
