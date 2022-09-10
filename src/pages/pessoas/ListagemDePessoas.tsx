import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BarraDeFerramentas } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks/UseDebounce";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => { //Esse será um componente funcional, por isso, ele é do tipo "React.FC".

    const { debounce } = useDebounce();

    const [searchParams, setSearchParams] = useSearchParams(); //Utilizaremos esse hook para gerenciar os query params que serão enviados pela URL.
    const navigate = useNavigate(); //Esse hook servirá para navegarmos para uma determinada página da aplicação.


    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0); //Esse state guardará a quantidade total de registros que temos no banco de dados.
    const [isLoading, setIsLoading] = useState(true); //Esse state será responsável por definir quando o componente visual de "loading" aparecerá na tela.

    const busca = useMemo(() => {

        return searchParams.get('busca') || '';
    }, [searchParams]);

    /**
     * Estamos obtendo a página em que estamos dentro da
     * aplicação.
     */

    const pagina = useMemo(() => {

        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => { //Estamos utilizando esse hook personalizado para esperarmos um delay até essa função ser executada, evitando que o back-end seja sobrecarregado, ou seja, evitando que, a cada caractere digitado no campo de busca, uma requisição ao back-end seja realizada.
            PessoasService.getAll(pagina, busca)
                .then((result) => {

                    setIsLoading(false); //Quando a consulta for finalizada, o ícone de "loading" não será mais exibido.

                    if (result instanceof Error) { //Estamos verificando se um erro foi gerado ao consultarmos o back-end.
                        alert(result.message)

                        return;
                    } else {

                        console.log(result);

                        setTotalCount(result.totalCount);
                        setRows(result.data);
                    }
                });
        });

    }, [busca, pagina]); //Utilizaremos o "useEffect()" para reexecutarmos uma consulta apenas em momentos específicos, e não em todos os momentos em que o componente for atualizado, evitando problemas de performance.

    /**
     * Dentro desse método, teremos a lógica de deletar um determinado
     * registro, que será ativada quando o usuário clicar no botão "delete".
     */
    const handleDelete = (id: number) => {

        if (confirm('Realmente deseja apagar?')) {

            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(linhasAntigas => { //O "linhasAntigas" é o estado atual, que contém a linha que foi deletada.

                            return [ //Estamos retornando um novo estado, com todas as linhas do estado anterior, exceto a linha do ID que estamos apagando.
                                ...linhasAntigas.filter(linhaAntiga => linhaAntiga.id !== id)
                            ]
                        });
                        alert('O registro foi apagado com sucesso!')
                    }
                });
        }
    }

    /**
     * Sem o parâmetro "replace = true", uma requisição, ou seja, um novo
     * endereço de busca seria enviado no navegador a cada letra digitada, assim, com
     * o "replace", o React Router DOM não registrará várias rotas no histórico do
     * navegador do usuário, ou seja, não registrará uma nova rota a cada letra
     * digitada.
     */

    /**
     * Basicamente, a cada letra digitada no input de busca, a URL será
     * alterada.
     */

    /**
     * O atributo "sx" é como se fosse um style in-line, porém, ele, por trás dos
     * panos, cria uma classe CSS com esses estilos, e, dessa forma, o componente não
     * fica com muitos atributos CSS.
     * 
     * O atributo "width: 'auto'" deixará a tabela com a largura automática de acordo com o
     * tamanho da tela.
     * 
     * O componente "<caption>" com a mensagem de lista vazia só será
     * exibido se o "totalCount" for "0" e se a listagem não estiver carregando.
     */

    return (
        <LayoutBaseDePagina
            titulo='Listagem de Pessoas'
            barraDeFerramentas={
                <BarraDeFerramentas
                    mostrarInputBuscar
                    textoBotaoNovo='Nova'
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })} />}>

            <TableContainer component={Paper}
                variant="outlined"
                sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant='indeterminate' />

                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        page={pagina}
                                        onChange={(_, novaPagina) => setSearchParams({ busca, pagina: novaPagina.toString() }, { replace: true })} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBaseDePagina>
    );
}