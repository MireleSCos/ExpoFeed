import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Feed from '../pages/Feed';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Feed" component={Feed} />
  </AppStack.Navigator>
);

export default AppRoutes;
