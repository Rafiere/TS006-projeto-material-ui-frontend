/**
 * Esse layout será utilizado em diversas páginas diferentes.
 */

import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {

    children: React.ReactNode
    titulo: string;
    barraDeFerramentas?: ReactNode; //Em algumas páginas, pode ser possível que não queiramos exibir a barra de ferramentas, por isso ela será undefined.
}

/**
 * O primeiro box do layout base terá o título da página, o segundo terá
 * a barra de ferramentas e o terceiro terá o conteúdo de cada página.
 */

/**
 * Com esse arquivo, toda a configuração de responsividade será realizada por
 * apenas uma única vez. 
 */

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * O "smDown" serve para apenas exibir o "IconButton" se o tamanho da
     * tela for "sm", ou seja, pequena. Esse valor será obtido pelo "useMediaQuery()".
     */

    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
                display="flex" alignItems="center">

                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>
                            menu
                        </Icon>
                    </IconButton>)}

                <Typography variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipses">
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && (<Box>
                {barraDeFerramentas}
            </Box>)}

            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
}