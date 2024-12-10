import React, { ReactNode } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

export default ThemeProvider;
