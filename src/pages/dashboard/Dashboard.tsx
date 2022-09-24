import { Box, Card, CardContent, debounce, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const Dashboard = () => {

    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [totalCountCidades, setTotalCountCidades] = useState(0);

    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalCountPessoas, setTotalCountPessoas] = useState(0);

    useEffect(() => {

        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);

        CidadesService.getAll(1)
            .then((result) => {

                setIsLoadingCidades(false); //Quando a consulta for finalizada, o ícone de "loading" não será mais exibido.

                if (result instanceof Error) { //Estamos verificando se um erro foi gerado ao consultarmos o back-end.
                    alert(result.message)

                    return;
                } else {


                    setTotalCountCidades(result.totalCount);
                }
            });

        PessoasService.getAll(1)
            .then((result) => {

                setIsLoadingPessoas(false); //Quando a consulta for finalizada, o ícone de "loading" não será mais exibido.

                if (result instanceof Error) { //Estamos verificando se um erro foi gerado ao consultarmos o back-end.
                    alert(result.message)

                    return;
                } else {


                    setTotalCountPessoas(result.totalCount);
                }
            });

    }, []);

    return (
        <LayoutBaseDePagina
            titulo="Página Inicial"
            barraDeFerramentas={<BarraDeFerramentas mostrarBotaoNovo={false} />}>
            <Box width='100%' display='flex'>
                <Grid container margin={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} margin={2}>
                            <Card>
                                <CardContent>

                                    <Typography variant='h5' align='center'>
                                        Total de Pessoas
                                    </Typography>


                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>

                                        {!isLoadingPessoas && (<Typography variant='h1' align='center'>
                                            {totalCountPessoas}
                                        </Typography>)}

                                        {isLoadingPessoas && (<Typography variant='h6' align='center'>
                                            Carregando...
                                        </Typography>)}
                                    </Box>
                                </CardContent>
                            </Card>

                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} margin={2}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de Cidades
                                    </Typography>

                                    <Box padding={6} display='flex' justifyContent='center' alignItems='center'>

                                        {!isLoadingCidades && (<Typography variant='h1' align='center'>
                                            {totalCountCidades}
                                        </Typography>)}

                                        {isLoadingCidades && (<Typography variant='h6' align='center'>
                                            Carregando...
                                        </Typography>)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>

            </Box>
        </LayoutBaseDePagina >
    );
}