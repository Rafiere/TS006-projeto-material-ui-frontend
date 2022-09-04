/**
 * Esse contexto servirá para compartilharmos as informações
 * dos nossos temas.
 */

import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "../themes";

/**
 * Essa interface definirá os atributos que serão
 * compartilhados por esse contexto.
 */

interface IThemeContextData {
    themeName: 'light' | 'dark' //Essa propriedade vai aceitar apenas "light" e "dark".
    toggleTheme: () => void; //Essa função trocará o tema claro para o tema escuro e vice-versa.
}

interface IAppThemeProviderProps {

    children: React.ReactNode
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {

    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => { //O "useCallback()" armazena funções dentro dele. A cada vez que o segundo parâmetro for alterado, a função que está sendo passada como parâmetro será executada.
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    }, []);

    const theme = useMemo(() => {

        if (themeName === 'light') return LightTheme;

        return DarkTheme;
    }, [themeName]); //Todas as vezes que o nome do tema for alterado, essa função será alterada.

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>

                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};