import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  min-width: 26%;
 
  flex: 1;
  justify-content: center;
  align-items: center; 

  background-color: ${({ theme }) => theme.colors.background_primary};

  padding: 16px;
  margin-right: 8px;
  margin-bottom: 8px;

  border-color: ${({ theme }) => theme.colors.line};
  border-bottom-width: 1px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};

  color: ${({ theme }) => theme.colors.text};
`;