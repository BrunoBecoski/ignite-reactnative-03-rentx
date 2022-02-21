import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelarationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  About,
  Footer
} from './styles';

export function CarDetails(){
  const navigation = useNavigation();

  function handleChooseRentalPeriod() {
    navigation.navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider 
          imageUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory 
            icon={speedSvg}
            name='380km/h'
          />
          <Accessory 
            icon={accelarationSvg}
            name='3.2s'
          />
          <Accessory 
            icon={forceSvg}
            name='800 HP'
          />
          <Accessory 
            icon={gasolineSvg}
            name='Gasolina'
          />
          <Accessory 
            icon={exchangeSvg}
            name='Auto'
          />
          <Accessory 
            icon={peopleSvg}
            name='2 pessoas'
          />
        </Acessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário
          touro de lide indultado na praça Real Maestranza de Servilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button 
          onPress={handleChooseRentalPeriod}
          title='Escolher período de aluguel'
        />
      </Footer>

    </Container>
  );
}