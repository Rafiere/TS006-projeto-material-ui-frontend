/**
 * 
 */

import { useCallback, useRef } from "react";

/**
 * Esse hook personalizado servirá para executar uma determinada função
 * após uma determinada quantidade de segundos, que será passada pelo parâmetro
 * "delay".
 * 
 * Essa função apenas será executada depois que o delay for cumprido, e, se
 * essa função for executada novamente antes do delay ser cumprido, o delay
 * será reiniciado.
 * 
 * Essa função é muito útil para, por exemplo, em barras de pesquisa, não enviarmos
 * dez requisições para o back-end se o usuário digitar dez letras, e, sim, enviarmos a
 * requisição apenas quando o usuário terminar de digitar, ou seja, quando o tempo de
 * delay for cumprido com sucesso.
 */

export const useDebounce = (delay = 300, notDelayInFirstTime = true) => { //Podemos selecionar o tempo de delay, e, se na primeira vez que essa função for executada, o tempo do delay ser ou não aguardado.

    const debouncing = useRef<NodeJS.Timeout>();

    const isFirstTime = useRef(notDelayInFirstTime); //Se estivermos executando a função pela primeira vez, a consulta será realizada imediatamente, sem esperar o tempo de delay.

    const debounce = useCallback((func: () => void) => {

        if (isFirstTime.current) {

            isFirstTime.current = false;
            func(); //Estamos, automaticamente, executando a função que recebemos por parâmetro.

        } else {
            if (debouncing.current) {
                clearTimeout(debouncing.current);
            }

            debouncing.current = setTimeout(() => {
                func();
            }, delay)
        }
    }, [delay]);

    return { debounce };
}