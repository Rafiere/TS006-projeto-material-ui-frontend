import axios from 'axios'
import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

/**
 * Nesse arquivo, criaremos uma instância do Axios para
 * realizarmos chamadas HTTP.
 */

const Api = axios.create({
    baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);

export { Api };