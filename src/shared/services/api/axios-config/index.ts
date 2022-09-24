import axios from 'axios'
import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

/**
 * Nesse arquivo, criaremos uma instância do Axios para
 * realizarmos chamadas HTTP.
 */

const Api = axios.create({
    baseURL: Environment.URL_BASE,
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '""')}` //Sempre que enviarmos uma requisição, será enviado o bearer token, que estará armazenado no local storage da aplicação.
    }
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);

export { Api };