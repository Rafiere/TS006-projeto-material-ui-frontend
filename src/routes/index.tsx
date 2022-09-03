/**
 * O arquivo "index.ts" é o arquivo responsável em dar 
 * "export" para toda a aplicação.
 */

import { Navigate, Route, Routes } from "react-router-dom";
import { Button } from "@mui/material";

/**
 * Os endereços serão buscados de cima para baixo. Se a rota
 * que foi digitada pelo usuário não for encontrada, ele cairá na
 * rota "*", que redirecionará o usuário para o "/pagina-inicial".
 */

export const AppRoutes = () => { //Esse é um componente do React que conterá todas as rotas da aplicação.

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color='primary'>Teste</Button>}/>

            <Route path="*" element={<Navigate to="pagina-inicial"/>} />
        </Routes>
    );
}