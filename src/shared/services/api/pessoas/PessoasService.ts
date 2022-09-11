import { url } from "inspector";
import { Environment } from "../../../environment";
import { Api } from "../axios-config";

/**
 * O TypeScript retorna uma promessa de que uma determinada
 * consulta será executada, assim, quando essa consulta for
 * executada, podemos obter os dados dessa consulta.
 */

export interface IListagemPessoa {
    id: number;
    email: string;
    cidadeId: number; //Esse ID representará o relacionamento entre a pessoa e a cidade da pessoa.
    nomeCompleto: string;
}

export interface IDetalhePessoa {
    id: number;
    email: string;
    cidadeId: number; //Esse ID representará o relacionamento entre a pessoa e a cidade da pessoa.
    nomeCompleto: string;
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => { //Podemos retornar o resultado da consulta ou um erro.

    try {

        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`

        const { data, headers } = await Api.get(urlRelativa);

        if (data) { //Se os dados foram retornados pelo back-end corretamente, esses dados serão retornados para que, dessa forma, possam ser manipulados.
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS), //O JsonServer retorna um header com o total de registros no banco de dados.
            };
        }

        return new Error('Erro ao listar os registros.');

    } catch (error) {

        console.error(error);

        return new Error((error as { message: string }).message || 'Erro ao listar os registros.'); //Se o back-end não retornar uma mensagem de erro personalizada, teremos uma mensagem de erro padrão.
    }
}

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {

    try {

        const { data } = await Api.get(`/pessoas/${id}`);

        if (data) { //Se os dados foram retornados pelo back-end corretamente, esses dados serão retornados para que, dessa forma, possam ser manipulados.
            return data;
        }

        return new Error('Erro ao consultar o registro.');

    } catch (error) {

        console.error(error);

        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.'); //Se o back-end não retornar uma mensagem de erro personalizada, teremos uma mensagem de erro padrão.
    }

}

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => { //Não informaremos o ID do registro que estamos criando, pois ele será gerado pelo back-end da aplicação.

    try {

        console.log(dados);

        const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados); //A API retornará um objeto do tipo "IDetalhePessoa" após ela ser chamada.

        if (data) {
            return data.id;
        }

        return new Error('Erro ao criar o registro.');

    } catch (error) {

        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }

}

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {

    try {

        await Api.put<IDetalhePessoa>(`/pessoas/${id}`, dados); //A API retornará um objeto do tipo "IDetalhePessoa" após ela ser chamada.
        
    } catch (error) {

        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }

}

const deleteById = async (id: number): Promise<void | Error> => {

    try {

        await Api.delete(`/pessoas/${id}`)

    }catch(error){
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao deletar o registro.');
    }

}

export const PessoasService = {

    getAll,
    getById,
    create,
    updateById,
    deleteById
}