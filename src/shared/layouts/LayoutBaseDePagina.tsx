/**
 * Esse layout será utilizado em diversas páginas diferentes.
 */

import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {

    children: React.ReactNode
    titulo: string;
}

/**
 * O primeiro box do layout base terá o título da página, o segundo terá
 * a barra de ferramentas e o terceiro terá o conteúdo de cada página.
 */

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    /**
     * O "smDown" serve para apenas exibir o "IconButton" se o tamanho da
     * tela for "sm", ou seja, pequena. Esse valor será obtido pelo "useMediaQuery()".
     */

    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} height={theme.spacing(12)}
                display="flex" alignItems="center">

                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>
                            menu
                        </Icon>
                    </IconButton>)}

                <Typography variant="h5">
                    {titulo}
                </Typography>
            </Box>

            <Box>
                Barra de Ferramentas
            </Box>

            <Box>
                Children
            </Box>
        </Box>
    );
}