import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Office from './pages/Office';
import Scripture from './pages/Scripture';

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Office: {
      screen: Office,
    },
    Scripture: {
      screen: Scripture,
    },
  },
  {
    initialRouteName: 'Home'
  }
);

const App = createAppContainer(MainNavigator);

export default App;
