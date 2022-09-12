import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import * as yup from "yup"
import { IVFormErrors } from "../../shared/forms/IVFormErrors";


/**
 * Essa interface representa uma tipagem para os dados que serão gerados pelo formulário.
 */

interface IFormData {

    nome: string;
}

/**
 * Esse será o schema de validação para os dados do formulário que
 * serão enviados para o back-end.
 */

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object()
    .shape({
        nome: yup.string().required().min(3),
    });

export const DetalheDeCidades: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>(); //Estamos obtendo o parâmetro "id", que é o ID de uma cidade, da URL.

    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm() //Esse hook serve para pegarmos uma referência do componente de formulário e armazenarmos nessa constante, assim, podemos dar um submit visual no formulário.

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const handleSave = (dados: IFormData) => {

        formValidationSchema.validate(
            dados, { abortEarly: false } //O "abortEarly" parará a validação no primeiro campo que o erro ocorrer, e isso não é intuitivo para o usuário, assim, com essa propriedade "false", o usuário verá todas as mensagens de erro.
        ).
            then((dadosValidados) => {
                setIsLoading(true);

                if (id === 'nova') {

                    CidadesService.create(dadosValidados) //Estamos obtendo o ID do usuário que foi cadastrado.
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) { //Se estamos criando um serviço novo e clicamos no botão "salvar e fechar", queremos fechar a tela de detalhe, ou seja, navegar para a tela "/cidades" e voltar para a listagem.
                                    navigate('/cidades');
                                } else {
                                    navigate(`/cidades/detalhe/${result}`);
                                }
                            }
                        })

                } else { //Dependendo do botão em que o usuário clicar, ele criará uma nova cidade ou atualizará uma cidade já existente.

                    CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados }) //Estamos obtendo o ID do usuário que foi cadastrado.
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');
                                }
                            }
                        })

                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {}; //Estamos inicializando um mapa com as chaves e valores do tipo string.
                
                errors.inner.forEach(error => {
                    if(!error.path){ //Se o erro for undefined, retornaremos.
                        return;
                    }

                    validationErrors[error.path] = error.message //Vamos passar por cada um dos erros que ocorreram no formulário e criar um mapa com os erros que foram gerados.
                })

                console.log(validationErrors);
                formRef.current?.setErrors(validationErrors); //Estamos passando os erros gerados para o Yup para o formulário.
            });


    }

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {

            CidadesService.deleteById(id)
                .then(resultado => {
                    if (resultado instanceof Error) {
                        alert(resultado.message);
                    } else {
                        alert('O registro foi apagado com sucesso!')
                        navigate('/cidades');
                    }
                });
        }
    }

    useEffect(() => {

        if (id !== 'nova') {

            setIsLoading(true); //Quando entrarmos na consulta, a aplicação saberá que ela está carregando.

            CidadesService.getById(Number(id))
                .then((resultado) => {

                    setIsLoading(false);

                    if (resultado instanceof Error) {
                        alert(resultado.message);
                        navigate('/cidades');
                    } else {
                        setNome(resultado.nome);
                        console.log(resultado);

                        formRef.current?.setData(resultado); //Estamos setando os dados nas caixas de texto após o usuário ser salvo.
                    }
                })
        } else { //Os dados do input serão limpos quando clicarmos em "Nova".
            formRef.current?.setData({
                nome: '',
            });
        }
    }, [id])

    /**
     * O botão de "Apagar" apenas aparecerá quando estivermos editando uma cidade já
     * existente na aplicação, ou seja, quando o "ID" for diferente de "nova". Quando o ID é igual
     * a "nova", isso significa que a cidade está sendo criada, logo, o botão de "Apagar" não deve ser
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
        <LayoutBaseDePagina titulo={id === 'nova' ? 'Nova Cidade' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}
                    aoClicarEmNovo={() => { navigate('/cidades/detalhe/nova') }}
                    aoClicarEmVoltar={() => { navigate('/cidades') }}
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
                                    name='nome'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)} />

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