import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import { Environment } from "../../environment";

interface IBarraDeFerramentasProps { //Esses atributos servirão para configurarmos o input de pesquisa.
    textoDaBusca?: string;
    mostrarInputBuscar?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;

    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
    textoDaBusca = '',
    mostrarInputBuscar = false,
    aoMudarTextoDeBusca,

    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarEmNovo
}) => {

    /**
     * O "paper" é um componente do Material. Ao utilizarmos a
     * propriedade "component" no componente "Box", estamos herdando todas
     * as propriedades do componente "Paper", ou seja, estamos fazendo uma composição
     * de componentes, assim, o componente "Box" terá as suas propriedades junto com as
     * propriedades do componente "Paper".
     * 
     * Se estivéssemos utilizando um componente "Paper" e precisassemos de propriedades que o
     * componente "Box" possui, poderíamos fazer o caminho ao contrário.
     */

    const theme = useTheme();

    /**
     * A propriedade "display flex" altera a forma com que o Layout se comporta na tela. Por
     * padrão, o layout vai passar a ficar como "linha", ou seja, teremos um componente ao lado
     * do outro.
     * 
     * O "alignItems=center" alinhará os elementos pelo centro.
     * 
     * O "gap" apenas funciona no display flex. Ele informa a distância entre dois elementos, que, anteriormente, estavam
     * colados entre si.
     * 
     * Os atributos "gap", "marginX", "padding" e "paddingX" trabalham com uma unidade de medida, o atributo "height" não, por isso, no
     * atributo "height", foi necessária a padronização.
     */

    return (
        <Box height={theme.spacing(5)}
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            component={Paper}>

            {mostrarInputBuscar && (<TextField
                size="small"
                placeholder={Environment.INPUT_DE_BUSCA}
                value={textoDaBusca}
                onChange={(evento) => aoMudarTextoDeBusca?.(evento.target.value)} />
            )}

            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (

                    <Button variant='contained'
                        color='primary'
                        disableElevation
                        startIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovo}>
                            {textoBotaoNovo}
                    </Button>
                )}


            </Box>

        </Box>
    );
}