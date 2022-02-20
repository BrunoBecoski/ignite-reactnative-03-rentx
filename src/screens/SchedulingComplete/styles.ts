import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.header};

  padding: 25px 0;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  color: ${({ theme }) => theme.colors.shape};

  margin-top: 20px;
  margin-bottom: 8px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  color: ${({ theme }) => theme.colors.text_detail};
  line-height: ${RFValue(25)}px;
  text-align: center;
`;

export const Footer = styled.View`
  justify-content: flex-end;
  align-items: center;
`;