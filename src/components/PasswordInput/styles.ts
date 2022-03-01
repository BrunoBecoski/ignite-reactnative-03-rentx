import styled from 'styled-components/native';
import { TextInput }from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: 55px;
  width: 55px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  margin-right: 2px;
`;

export const InputText = styled(TextInput)`
  flex: 1;

  font-size: ${RFValue(15)}px;
  font-family:  ${({ theme }) => theme.fonts.primary_400};
  
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};

  padding: 0 24px;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
  height: 55px;
  width: 55px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;