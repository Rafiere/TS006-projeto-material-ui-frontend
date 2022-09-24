import { Api } from "../axios-config";

interface IAuth {
    accessToken: string;
}

const auth = async(email: string, password: string): Promise<IAuth | Error> => {

    try {
        const { data } = await Api.get('/auth', {data: {email, password}}); //Na vida real, isso seria um "POST" que enviaria o email e a senha para o back-end. Esse email e senha deveriam ser enviados no body da requisição, para que o HTTPS criptografe os dados e um possível invasor, com o WireShark, não possa ver o email e a senha que estamos enviando.
    
        if(data){ //O "data" contém o access token que foi retornado.
            return data;
        }

        return new Error('Erro no login.');
    }catch(error){
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro no login.');
    }
}

export const AuthService = {

    auth,
};