import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTO'; 
import { api } from '../../services/api';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
  OfflineInfo
} from './styles';

interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const routes = useRoute();
  const { car } = routes.params as Params;

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleChooseRentalPeriod() {
    navigation.navigate('Scheduling', { car });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fecthCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) {
      fecthCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary}
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View 
          style={[sliderCarsStyleAnimation]}
        >
          <CarImages>
            <ImageSlider 
              imagesUrl={
                !!carUpdated.photos 
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignItems: 'center',
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>
              R$ { netInfo.isConnected === true ? car.price : '...'}
            </Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
          <Accessories>
          {
            carUpdated.accessories.map((accessory) => (
              <Accessory 
              key={accessory.id}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
              />
              ))
            }
          </Accessories>
        }

        <About>{car.about}</About>
      </Animated.ScrollView>
      

      <Footer>
        <Button 
          onPress={handleChooseRentalPeriod}
          title='Escolher período de aluguel'
          enabled={netInfo.isConnected === true}
        />
        {
          netInfo.isConnected === false && 
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendae seu carro.
          </OfflineInfo>
        }
      </Footer>

    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
});