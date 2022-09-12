import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

/**
 * Esse Hook encapsula a configuração básica do "useRef()" do formulário.
 */

export const useVForm = () => {

    const formRef = useRef<FormHandles>(null);

    const isSavingAndClose = useRef(false);
    const isSavingAndNew = useRef(false);

    /**
     * As três primeiras funções serão responsáveis pela execução da
     * ação de salvar do usuário.
     */

    const handleSave = useCallback(() => {

        isSavingAndClose.current = false;
        isSavingAndNew.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndNew = useCallback(() => {

        isSavingAndClose.current = false;
        isSavingAndNew.current = true;
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndClose = useCallback(() => {

        isSavingAndClose.current = true;
        isSavingAndNew.current = false;
        formRef.current?.submitForm();
    }, []);



    const handleIsSaveAndNew = useCallback(() => {

        return isSavingAndNew.current;
    }, []);

    const handleIsSaveAndClose = useCallback(() => {
        
        return isSavingAndClose.current;
    }, []);

    return {
        formRef,

        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,

        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndClose: handleIsSaveAndClose
    };
}