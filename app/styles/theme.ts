import type { ThemeConfig } from '@chakra-ui/react';
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

export default extendTheme(
  config,
  withDefaultColorScheme({ colorScheme: 'orange' }),
);
