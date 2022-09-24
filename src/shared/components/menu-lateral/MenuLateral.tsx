import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useMatch, useNavigate, useResolvedPath } from "react-router";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useAuthContext } from "../../contexts/AuthContext";

/**
 * Drawer
 * 
 * --
 * 
 * A propriedade "open" diz se o Drawer ficará
 * fechado ou aberto.
 * 
 * ---
 * 
 * A propriedade "variant" diz como queremos o menu
 * lateral. 
 * 
 * O valor "permanent" significa que ele sempre
 * ficará fixo no canto, ou seja, não teremos o botão de
 * abre e fecha. Se a propriedade "permanent" estiver
 * habilitada, não precisamos da propriedade "open", pois
 * o Drawer sempre será exibido.
 * 
 * O valor "persistent" significa que o Drawer é fixo e que, quando
 * ele for expandido para o lado direito, ele ficará aberto do lado
 * esquerdo, por exemplo, e ele pode ser fechado para que tenhamos
 * mais espaço para o conteúdo da tela.
 * 
 * O "temporary" é o valor padrão. Ele não altera o layout dos
 * componentes que estão à direita, e fica por cima desses
 * componentes, ou seja, por cima da tela.
 * 
 * --
 * 
 * Box:
 * 
 * A largura do Drawer será definida de acordo com o conteúdo que temos
 * dentro do Drawer, assim, para que o Drawer ocupe toda a tela da aplicação, ele
 * deverá ter o mesmo tamanho do drawer.
 * 
 * ---
 * 
 * 
 */

interface IMenuLateralProps {

    children: React.ReactNode
}

interface IListItemLinkProps {
    icon: string;
    to: string;
    label: string;
    onClick: (() => void) | undefined; //Esse evento servirá para fecharmos o menu lateral quando clicarmos em uma opção.
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to); //Esse hook interpretará a rota que estamos passando e deixará algumas opções disponíveis para o desenvolvedor.
    const match = useMatch({ path: resolvedPath.pathname, end: false }); //Esse match conseguirá saber se a opção do menu está selecionada ou não, para manter ou não a cor de seleção de um elemento do drawer.

    const handleClick = () => {
        navigate(to);
        onClick?.(); //Se a função for undefined, não será feito nada. Se ela não for undefined, ela será executada.
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>);
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => { //A variável "children" terá todos os elementos que são filhos do componente "MenuLateral".

    //Esse é um hook do material e que permite o acesso ao
    //tema base da aplicação, que foi configurado anteriormente.
    const theme = useTheme()

    const smDown = useMediaQuery(theme.breakpoints.down('sm')); //Se a tela estiver abaixo de "sm", ou seja, o tamanho da tela for muito pequeno, o valor da const "smDown" será "true". Quando o valor dessa const for "true", o valor da propriedade "variant" será alterado, tornando o layout responsivo.

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

    const { toggleTheme } = useAppThemeContext();
    const { logout } = useAuthContext();

    //O Material UI tem uma unidade de medida própria. Um "spacing"
    //equivale a 4 pixels. SEMPRE QUE TIVERMOS QUE UTILIZAR UM VALOR
    //FIXO, DEVEMOS UTILIZAR O SPACING AO INVÉS DO "PX".

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">

                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjSVqfmQbQlv_MYeur-ZUXi2VyAcHzx4Faw&usqp=CAU"
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }} />
                    </Box>

                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map((drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    to={drawerOption.path}
                                    label={drawerOption.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            )))}
                        </List>
                    </Box>

                    <Box>
                        <List component="nav">
                                <ListItemButton onClick={toggleTheme}>
                                    <ListItemIcon>
                                        <Icon>dark_mode</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Alternar Tema" />
                                </ListItemButton>

                                <ListItemButton onClick={logout}>
                                    <ListItemIcon>
                                        <Icon>logout</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Sair" />
                                </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}

            </Box>
        </>
    );
}