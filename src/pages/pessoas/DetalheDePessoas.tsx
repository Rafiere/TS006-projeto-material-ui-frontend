import { LinearProgress, TextField } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setEnvironmentData } from "worker_threads";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import { VTextField } from "../../shared/forms";
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

    const formRef = useRef<FormHandles>(null); //Esse hook serve para pegarmos uma referência do componente de formulário e armazenarmos nessa constante, assim, podemos dar um submit visual no formulário.

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
                        console.log(dados);
                        navigate(`/pessoas/detalhe/${result}`);
                    }
                })

        } else { //Dependendo do botão em que o usuário clicar, ele criará uma nova pessoa ou atualizará uma pessoa já existente.

            PessoasService.updateById(Number(id), { id: Number(id), ...dados }) //Estamos obtendo o ID do usuário que foi cadastrado.
                .then((result) => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
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
                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()} />
            }>

            {/* {isLoading && (
                    <LinearProgress variant='indeterminate'/>
                )} */}

            {/*
                    Passaremos o objeto com os atributos do formulário para o método "handleSave", que lidará com esses dados.
                */}

            <Form ref={formRef} onSubmit={handleSave}>
                <VTextField placeholder='Nome' name='nomeCompleto' />
                <VTextField placeholder='Email' name='email' />
                <VTextField placeholder='Cidade ID' name='cidadeId' />
            </Form>

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