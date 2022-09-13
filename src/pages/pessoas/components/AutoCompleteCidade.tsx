import { StrikethroughSTwoTone } from "@mui/icons-material";
import { Autocomplete, CircularProgress, debounce, TextField } from "@mui/material"
import { getValue } from "@mui/system";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks/UseDebounce";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";

/**
 * Esse componente fará o autocomplete de cidades conforme digitamos
 * os caracteres.
 */

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {

    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');

    const [selectedId, setSelectedId] = useState<number | undefined>(undefined); //Aqui, teremos o ID da cidade que foi selecionada no componente de autocomplete.

    const [busca, setBusca] = useState('');

    const { debounce } = useDebounce();

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, novoSelectedId) => setSelectedId(novoSelectedId)
        })
    })

    useEffect(() => {

        setIsLoading(true);

        /**
         * Estamos buscando as cidades disponíveis no back-end e sugerindo essas
         * cidades no autocomplete.
         */

        debounce(() => {
            CidadesService.getAll(1,)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);
                        setOpcoes(result.data.map(cidade => ({
                            id: cidade.id, label: cidade.nome
                        })));
                    }
                })
        })
    }, [])

    //Essa constante guardará a opção que foi selecionada no autocomplete.
    const autoCompleteSelectedOption = useMemo(() => {

        if (selectedId === undefined) {
            return null;
        }

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId); //Estamos encontrando a opção que foi selecionada pelo ID.

        if(!selectedOption) return null;

        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'
            disablePortal
            value={autoCompleteSelectedOption}
            loading={isLoading}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            options={opcoes}
            disabled={isExternalLoading}
            onInputChange={(_, novoValor) => setBusca(novoValor)}
            onChange={(_, novoValor) => {
                setSelectedId(novoValor?.id);
                setBusca('');
                clearError();
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={!!error}
                    helperText={error}
                    label="Cidade" />
            )} />
    )
}