import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

/**
 * Essa interface representa uma tipagem para os dados que serão gerados pelo formulário.
 */

interface IFormData {

    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>(); //Estamos obtendo o parâmetro "id", que é o ID de uma pessoa, da URL.

    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm() //Esse hook serve para pegarmos uma referência do componente de formulário e armazenarmos nessa constante, assim, podemos dar um submit visual no formulário.

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const handleSave = (dados: IFormData) => {

        setIsLoading(true);

        if (id === 'nova') {

            PessoasService.create(dados) //Estamos obtendo o ID do usuário que foi cadastrado.
                .then((result) => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if(isSaveAndClose()){ //Se estamos criando um serviço novo e clicamos no botão "salvar e fechar", queremos fechar a tela de detalhe, ou seja, navegar para a tela "/pessoas" e voltar para a listagem.
                            navigate('/pessoas');
                        } else {
                            navigate(`/pessoas/detalhe/${result}`);
                        }
                    }
                })

        } else { //Dependendo do botão em que o usuário clicar, ele criará uma nova pessoa ou atualizará uma pessoa já existente.

            PessoasService.updateById(Number(id), { id: Number(id), ...dados }) //Estamos obtendo o ID do usuário que foi cadastrado.
                .then((result) => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if(isSaveAndClose()){
                            navigate('/pessoas');
                        }
                    }
                })

        }
    }

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {

            PessoasService.deleteById(id)
                .then(resultado => {
                    if (resultado instanceof Error) {
                        alert(resultado.message);
                    } else {
                        alert('O registro foi apagado com sucesso!')
                        navigate('/pessoas');
                    }
                });
        }
    }

    useEffect(() => {

        if (id !== 'nova') {

            setIsLoading(true); //Quando entrarmos na consulta, a aplicação saberá que ela está carregando.

            PessoasService.getById(Number(id))
                .then((resultado) => {

                    setIsLoading(false);

                    if (resultado instanceof Error) {
                        alert(resultado.message);
                        navigate('/pessoas');
                    } else {
                        setNome(resultado.nomeCompleto);
                        console.log(resultado);

                        formRef.current?.setData(resultado); //Estamos setando os dados nas caixas de texto após o usuário ser salvo.
                    }
                })
        } else { //Os dados do input serão limpos quando clicarmos em "Nova".
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: ''
            });
        }
    }, [id])

    /**
     * O botão de "Apagar" apenas aparecerá quando estivermos editando uma pessoa já
     * existente na aplicação, ou seja, quando o "ID" for diferente de "nova". Quando o ID é igual
     * a "nova", isso significa que a pessoa está sendo criada, logo, o botão de "Apagar" não deve ser
     * exibido.
     */

    /**
     * A tag "<Form>" é uma forma de dizermos que todos os componentes que estão
     * dentro dessa tag estão integrados com o Unform, que é uma biblioteca que facilita
     * a criação de formulários em nossa aplicação.
     */

    /**
     * Quando clicarmos no botão "Salvar", o submit do formulário será realizado.
     */

    return (
        <LayoutBaseDePagina titulo={id === 'nova' ? 'Nova Pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}
                    aoClicarEmNovo={() => { navigate('/pessoas/detalhe/nova') }}
                    aoClicarEmVoltar={() => { navigate('/pessoas') }}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose} />
            }>

            {/* {isLoading && (
                    <LinearProgress variant='indeterminate'/>
                )} */}

            {/*
                    Passaremos o objeto com os atributos do formulário para o método "handleSave", que lidará com esses dados.
                */}

            {/*
                No Layout Grid, teremos uma caixa em volta dos componentes. Essa caixa é o
                container. Dentro do container, temos várias caixinhas, que são os "grid items".

                Tudo que estiver no Grid Container será dividido em 12 partes, o "12" representa "100%". Se
                colocarmos que um elemento possui "xs=8", isso significa que ocuparemos uma certa
                porcentagem da tela.

                Com o Layout Grid é muito mais fácil de organizarmos os inputs na tela.
                O "md", "xs" são os tamanhos de acordo com o tamanho da tela. De acordo com
                o tamanho da tela atual, um componente pode ocupar quantidades diferentes de espaço do
                total de um Grid Container, que são 12 espaços.
            
                Todo "<Grid>" que possui um Grid como filho é um container. Se ele for filho de
                um grid e pai de outro grid, ele será um "item" e um "container" ao mesmo tempo.
            
                O atributo "direction='row'" define que os grids que estiverem dentro do grid atual deverão
                ficar no formato de linha, e não um abaixo do outro.

                Basicamente, quando o tamanho de tela estiver entre 0px e 600px, que é o tamanho "xs", o Grid ocupará, na
                tela, o valor do "xs".

                Se não informarmos o "sm", por exemplo, o Material UI utilizará o tamanho do "xs" até o "md".
            */}

            <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

                    <Grid container direction="column" padding={2} spacing={2}>

                        <Grid item>
                            <Typography variant='h6'>
                                Geral
                            </Typography>
                        </Grid>

                        {isLoading && (<Grid item>
                            <LinearProgress variant="indeterminate" />
                        </Grid>)}

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>

                                <VTextField
                                    fullWidth
                                    label='Nome'
                                    name='nomeCompleto'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)} />

                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>

                                <VTextField
                                    fullWidth
                                    label='Email'
                                    name='email'
                                    disabled={isLoading} />

                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>

                                <VTextField
                                    fullWidth
                                    label='Cidade ID'
                                    name='cidadeId'
                                    disabled={isLoading} />

                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </VForm>

            {

                /* 
                Nesses código, o "." representa um objeto, assim, teremos o campo
                simples "nomeCompleto", que será uma string, e o objeto
                "endereco" sendo enviado nesse formulário, que terá a "cidade" e
                a "rua".
                
                <Form onSubmit={console.log}>
                    <VTextField name='nomeCompleto'/>
                    <VTextField name='endereco.cidade'/>
                    <VTextField name='endereco.rua'/>
                </Form>
                
                No exemplo abaixo, o "endereco" passará a ser um array, e ele terá o objeto
                "0" que terá os atributos "cidade" e "rua".

                <Form onSubmit={console.log}>
                    <VTextField name='nomeCompleto'/>
                    <VTextField name='endereco[0].cidade'/>
                    <VTextField name='endereco[0].rua'/>
                </Form>
                
                Para utilizarmos o exemplo acima de forma dinâmica, ou seja, enviarmos vários
                objetos para o back-end, basta utilizarmos um map, por exemplo:
                
                {[1, 2, 3, 4].map((_, index) => (
                    <>
                        <VTextField name={`endereco[${index}].cidade}`/>
                        <VTextField name={`endereco[${index}].rua}`/>      
                    </>
                ))}

                No exemplo acima, enviaremos quatro objetos dentro do vetor "endereco."

                Podemos utilizar o "<Scope>" para realizarmos a mesma coisa do exemplo anterior e
                economizarmos muito código, por exemplo:

                {[1, 2, 3, 4].map((_, index) => (
                    <Scope key="" path={`endereco[${index}]`}>
                        <VTextField name='cidade'/>
                        <VTextField name='rua'/>      
                    </Scope>
                ))}

                */

            }

        </LayoutBaseDePagina>
    );
}