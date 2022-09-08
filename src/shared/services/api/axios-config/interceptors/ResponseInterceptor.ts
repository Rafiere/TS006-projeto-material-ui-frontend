import { AxiosResponse } from "axios";

/**
 * Poderíamos utilizar esse interceptor para executarmos uma
 * determinada ação sempre que uma chamada ao back-end fosse
 * concluída com sucesso.
 * 
 * Assim, por exemplo, caso fosse necessário o tratamento, em todas as
 * requisições, de um determinado dado que é retornado pelo back-end, poderíamos
 * inserir esse tratamento dentro desse interceptor. 
 */

export const responseInterceptor = (response: AxiosResponse) => {

    return response;
}