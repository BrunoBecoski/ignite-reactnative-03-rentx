import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';

import { AppStackRoutes } from './app.stack.routes';
import { Profile } from '../screens/Profile';
import { MyCars } from '../screens/MyCars';

import HomeSvg from '../assets/home.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: RFValue(60),
          backgroundColor: theme.colors.background_primary
        }
      }}
    >
      <Screen 
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ))
        }}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
            ))
          }}
      />
      <Screen 
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ))
        }}
      />
    </Navigator>
  );
}