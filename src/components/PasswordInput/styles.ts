import styled, { css } from 'styled-components/native';
import { TextInput }from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 55px;
  width: 55px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  margin-right: 2px;

  border-bottom-width: 2px;
  border-bottom-color: transparent;
  
  ${({ isFocused, theme}) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;

  font-size: ${RFValue(15)}px;
  font-family:  ${({ theme }) => theme.fonts.primary_400};
  
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};

  padding: 0 24px;

  border-bottom-width: 2px;
  border-bottom-color: transparent;
  
  ${({ isFocused, theme}) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const ChangePasswordVisibilityButton = styled(TouchableNativeFeedback)<Props>`
  height: 55px;
  width: 55px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-bottom-width: 2px;
  border-bottom-color: transparent;
  
  ${({ isFocused, theme}) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
  `};
`;