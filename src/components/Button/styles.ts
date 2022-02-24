import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps extends RectButtonProps {
  color?: string;
  enabled?: boolean;
  loading?: boolean;
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
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};

  color: ${({ theme }) => theme.colors.shape};
`;