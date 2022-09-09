/**
 * O arquivo "index.ts" é o arquivo responsável em dar 
 * "export" para toda a aplicação.
 */

import { Navigate, Route, Routes } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, ListagemDeCidade } from "../pages";

/**
 * Os endereços serão buscados de cima para baixo. Se a rota
 * que foi digitada pelo usuário não for encontrada, ele cairá na
 * rota "*", que redirecionará o usuário para o "/pagina-inicial".
 */

export const AppRoutes = () => { //Esse é um componente do React que conterá todas as rotas da aplicação.

    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => { //Basicamente, essa função configurará as opções de menu que aparecerão para o usuário, de forma dinâmica.
        setDrawerOptions([
            {
                label: 'Página Inicial',
                icon: 'home',
                path: '/pagina-inicial'
            },
            {
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
            },
        ]);
    }, []); //O "setDrawerOptions" será executado apenas uma vez, mesmo que naveguemos entre telas diferentes.

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>}/>
            <Route path="/cidades" element={<ListagemDeCidade/>}/>
            {/* <Route path="/cidades/detalhe/:id" element={}/> */}

            <Route path="*" element={<Navigate to="pagina-inicial"/>} />
        </Routes>
    );
}