import { ChakraProvider } from '@chakra-ui/react';
import theme from '@styles/theme';
import type { ReactChild } from 'react';

export const Providers = ({
  children,
}: {
  children: ReactChild | ReactChild[];
}) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
