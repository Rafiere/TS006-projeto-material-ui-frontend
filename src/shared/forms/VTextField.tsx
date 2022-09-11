/**
 * O "V" serve para diferenciarmos um "TextField" comum de
 * um TextField personalizado, feito para a biblioteca
 * Unform.
 * 
 * O "VTextField", basicamente, encapsulará o componente
 * "TextField" em uma camada do Unform.
 */

import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TVTextFieldProps = TextFieldProps & { //Estamos dizendo que esse componente pode receber todas as propriedades originais do "TextFieldProps" somado com o atributo "name".

    name: string;
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => { //Todas as outras propriedades do "TextFieldProps" ficarão dentro do "rest".

/**
 * O "fieldName" é a propriedade que serve para identificar o componente atual, ou seja, o
 * componente "VTextField" de forma única.
 * 
 * O "registerField" servirá para pedirmos para o Unform registrar o "VTextField", que é esse componente, dentro
 * do contexto do Unform.
 * 
 * O "defaultValue" é o valor padrão de um determinado campo. Ele deverá ser passado como parâmetro para essa
 * tag.
 * 
 * O "error" é uma propriedade que permitirá a passagem de erros para esse componente.
 * 
 * O "clearError" armazena uma forma desse componente limpar o erro de forma automática.
 */

    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || ''); //O state sempre inicializará algum valor. Isso serve para evitarmos erros na aplicação.

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value, //O "getValue" obterá o valor do state.
            setValue: (_, novoValor) => setValue(novoValor), //Esse valor setará um novo valor para o estado do value.
        })
    }, [registerField, fieldName, value])

    return (
        <TextField
            {...rest}

            error={!!error}
            helperText={error}
            defaultValue={defaultValue}

            onKeyDown={() => error ? clearError() : undefined}

            value={value}
            onChange={evento => setValue(evento.target.value)}
        />
    );
}