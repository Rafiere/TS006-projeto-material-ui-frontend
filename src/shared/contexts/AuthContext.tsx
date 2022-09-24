import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";

const AuthContext = createContext({} as IAuthContextData);

interface IAuthContextData {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void> //Essa função se conectará com o back-end e obterá o token do usuário.
    logout: () => void; //Essa função serve para deslogarmos o usuário.
}

interface IAuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {

    const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

    const [accessToken, setAccessToken] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

        if(accessToken){ //Se tivermos o accessToken, ele será setado. Se não tivermos, nada será feito.
            setAccessToken(JSON.parse(accessToken));
        }else{
            setAccessToken(undefined);
        }
    }, [])

//Sempre que estivermos colocando uma função, dentro de um contexto, que será
//passada por parâmetro, temos que utilizar o "useCallback()", senão o desempenho da
//aplicação será prejudicado.
const handleLogin = useCallback(async (email: string, password: string) => {

    //Estamos realizando a consulta para o back-end, e, através do "await", esperando essa consulta ser resolvida para continuarmos.
    const result = await AuthService.auth(email, password); //O "await" serve para esperarmos essa promessa ser resolvida. O código ficará travado até que isso ocorra.

    if(result instanceof Error){
        return result.message;
    }else {

        //O localstorage é uma forma não muito segura de armazenarmos o token. Normalmente, em uma aplicação grande, utilizariamos os cookies.
        localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken)); //Estamos armazenando o token no local storage.
        setAccessToken(result.accessToken);
    }

}, []);

const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined); //Se não temos o "accessToken" em nosso contexto, isso significa que o usuário não está autenticado, assim, para deslogarmos o usuário, basta retirarmos o "accessToken" dele.
}, []);

//O "!!accessToken" serve para realizarmos um casting do "accessToken" para boolean.
const isAuthenticated = useMemo(() => !!accessToken, []); //O useMemo servirá para verificarmos se temos ou não o access token localmente.

    return (

        <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
}