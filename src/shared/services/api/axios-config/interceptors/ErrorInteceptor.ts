import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {

    /**
     * Se o usuário estiver sem uma conexão com a internet ao
     * realizar a chamada, identificaremos e trataremos esse
     * erro para o usuário.
     */

    if(error.message === 'Network Error'){

        return Promise.reject(new Error('Erro de conexão.'));
    }

    if(error.response?.status === 401){
        //Aqui dentro, trataríamos os possíveis erros de
        //autenticação que poderiam ocorrer.
    }

    return Promise.reject(error);
}