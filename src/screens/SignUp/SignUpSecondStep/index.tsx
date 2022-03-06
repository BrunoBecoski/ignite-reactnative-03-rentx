import React, { useEffect, useState } from 'react';
import { 
  Alert,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { api } from '../../../services/api';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string; 
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(false);
  
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  
  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm) {
      return Alert.alert('Opa', 'Informe a senha e a confirmação');
    }

    if(password != passwordConfirm) {
      return Alert.alert('Opa', 'As senhas não são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenRoute: 'SignIn'
      });
    })
    .catch(() => {
      Alert.alert('Opa', 'Não foi possível cadastrar')
    });
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
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <BackButton onPress={handleBack} />
          <Steps>
            <Bullet />
            <Bullet active />
          </Steps>
        </Header>

        {
          !isKeyboardEnabled &&
          <>
            <Title>
              Crie sua{'\n'}conta
            </Title>
            <SubTitle>
              Faça seu cadastro de{'\n'}
              forma rápida e fácil
            </SubTitle>
          </>
        }

        <Form>
          <FormTitle>2. Senha</FormTitle>

          <PasswordInput 
            iconName="lock"
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />

          <PasswordInput 
            iconName="lock"
            placeholder="Repetir Senha"
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
          />

        </Form>

        <Button 
          title="Cadastrar"
          color={theme.colors.success}
          onPress={handleRegister}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}