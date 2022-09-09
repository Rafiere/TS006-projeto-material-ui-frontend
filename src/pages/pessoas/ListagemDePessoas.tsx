import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BarraDeFerramentas } from "../../shared/components";
import { useDebounce } from "../../shared/hooks/UseDebounce";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => { //Esse será um componente funcional, por isso, ele é do tipo "React.FC".

    const { debounce } = useDebounce();

    const [searchParams, setSearchParams] = useSearchParams(); //Utilizaremos esse hook para gerenciar os query params que serão enviados pela URL.

    const busca = useMemo(() => {

        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {

        debounce(() => { //Estamos utilizando esse hook personalizado para esperarmos um delay até essa função ser executada, evitando que o back-end seja sobrecarregado, ou seja, evitando que, a cada caractere digitado no campo de busca, uma requisição ao back-end seja realizada.
            PessoasService.getAll(1, busca)
                .then((result) => {

                    if (result instanceof Error) { //Estamos verificando se um erro foi gerado ao consultarmos o back-end.
                        alert(result.message)

                        return;
                    }

                    console.log(result);
                });
        });

    }, [busca]); //Utilizaremos o "useEffect()" para reexecutarmos uma consulta apenas em momentos específicos, e não em todos os momentos em que o componente for atualizado, evitando problemas de performance.

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
            titulo='Listagem de Pessoas'
            barraDeFerramentas={
                <BarraDeFerramentas
                    mostrarInputBuscar
                    textoBotaoNovo='Nova'
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })} />}>

        </LayoutBaseDePagina>
    );
}