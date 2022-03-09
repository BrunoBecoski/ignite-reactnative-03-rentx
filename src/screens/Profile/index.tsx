import React, { useEffect, useState } from 'react';
import { 
  Keyboard, 
  KeyboardAvoidingView, 
  StatusBar, 
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import {
  Container, 
  Header, 
  HeaderTitle, 
  HeaderTop,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';
import { PasswordInput } from '../../components/PasswordInput';

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(false);

  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {

  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () =>{
      setIsKeyboardEnabled(true);
    });
  
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardEnabled(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, []);

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle={isKeyboardEnabled ? "dark-content" : "light-content"}
            backgroundColor="transparent"
            translucent
          />

          {
            !isKeyboardEnabled &&
            <Header>
              <HeaderTop>
                <BackButton 
                  color={theme.colors.shape}
                  onPress={handleBack}
                />
                <HeaderTitle>Editar Perfil</HeaderTitle>
                <LogoutButton onPress={handleSignOut}>
                  <Feather 
                    name="power" 
                    size={24}
                    color={theme.colors.text_detail}
                  />
                </LogoutButton>
              </HeaderTop>

              <PhotoContainer>
                <Photo source={{ uri: 'https://github.com/brunobecoski.png'}}/>
                <PhotoButton onPress={() => {}}>
                  <Feather 
                    name="camera" 
                    size={24}
                    color={theme.colors.background_secondary}
                  />
                </PhotoButton>
              </PhotoContainer>
            </Header>
          }

          <Content
            style={{ marginBottom: useBottomTabBarHeight() }}
          >
            <Options>
              <Option 
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle  active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option 
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
          
            {
              option === 'dataEdit' 
              ?
                <Section>
                  <Input 
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={user.name}
                  />
                  <Input 
                    iconName="mail"
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input 
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                  />
                </Section>
              : 
                <Section>
                  <PasswordInput 
                    iconName="lock"
                    placeholder="Senha atual"
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Nova senha"
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Repetir nova senha"
                  />
                </Section>
            }

            <Button 
              title="Salvar alterações"
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
  );
}