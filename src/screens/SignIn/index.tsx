import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Alert,
  Keyboard,
  StatusBar, 
  TouchableWithoutFeedback
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import {
  Container, 
  Header, 
  Title,
  SubTitle, 
  Form,
  Footer
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('A senha é obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido')
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch(error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifiqueas credencias'
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
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
        {
          !isKeyboardEnabled &&
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível. 
            </SubTitle>
          </Header>
        }

        <Form>
          <Input 
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <PasswordInput 
            iconName="lock"
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />
        </Form>

        <Footer>
          <Button 
            title="Login"
            onPress={handleSignIn}
            enabled={true}
            loading={false}
          />
          <Button 
            title="Criar conta gratuita"
            color={theme.colors.background_secondary}
            light
            onPress={handleNewAccount}
            loading={false}
          />
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
}