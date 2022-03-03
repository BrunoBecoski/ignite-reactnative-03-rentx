import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps {
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;

  padding: 20px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};
  opacity: ${({ enabled, loading }) => 
    (enabled === false || loading === true ? .5 : 1 )
  };
  margin-bottom: 8px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};

  color: ${({ light, theme }) => light 
    ? theme.colors.title : theme.colors.shape
  };
`;