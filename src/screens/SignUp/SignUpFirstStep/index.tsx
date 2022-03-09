import React, { useEffect, useState } from 'react';
import { 
  Alert,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
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

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [isKeyboardEnabled, setIsKeyboardEnabled] = useState(false);

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obridatória'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        name: Yup.string()
          .required('Nome é obrigatório')
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }
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
            <Bullet active />
            <Bullet />
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
          <FormTitle>1. Dados</FormTitle>

          <Input 
            iconName="user"
            placeholder="Nome"
            autoCorrect={false}
            onChangeText={setName}
            value={name}
          />

          <Input 
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <Input 
            iconName="credit-card"
            placeholder="CNH"
            keyboardType="numeric"
            onChangeText={setDriverLicense}
            value={driverLicense}
          />
        </Form>

        <Button 
          title="Próximo"
          onPress={handleNextStep}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}