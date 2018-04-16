import React, {Component} from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class HomeScreen extends Component
{
  render()
  {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.navigate('DrawerOpen') } />
          </Left>
        </Header>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>Home Screen</Text>
          <Button onPress={() => updateItems() } />
          <Button onPress={() => setItems() } />
        </Content>
      </Container>
    )
  }
}
