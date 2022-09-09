import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemDeCidade: React.FC = () => { //Esse será um componente funcional, por isso, ele é do tipo "React.FC".

    const [searchParams, setSearchParams] = useSearchParams(); //Utilizaremos esse hook para gerenciar os query params que serão enviados pela URL.

    const busca = useMemo(() => {

        return searchParams.get('busca') || '';
    }, [searchParams]);

    /**
     * Sem o parâmetro "replace = true", uma requisição, ou seja, um novo
     * endereço de busca seria enviado no navegador a cada letra digitada, assim, com
     * o "replace", o React Router DOM não registrará várias rotas no histórico do
     * navegador do usuário, ou seja, não registrará uma nova rota a cada letra
     * digitada.
     */

    /**
     * Basicamente, a cada letra digitada no input de busca, a URL será
     * alterada.
     */

    return (
        <LayoutBaseDePagina
            titulo='Listagem de Cidades'
            barraDeFerramentas={
                <BarraDeFerramentas
                    mostrarInputBuscar
                    textoBotaoNovo='Nova'
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })} />}>

        </LayoutBaseDePagina>
    );
}