import React, {Component} from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class SettingsScreen extends Component
{
  render()
  {
    return (
      <Container>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>
            Settings Screen
          </Text>
        </Content>
      </Container>
    )
  }
}
