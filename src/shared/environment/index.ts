/**
 * O arquivo "index.ts" é o arquivo responsável em dar 
 * "export" para toda a aplicação.
 */

/**
 * Na constante "Environment", teremos todas as
 * variáveis de ambiente que ficarão visíveis na
 * aplicação.
 */

export const Environment = {

    /**
     * Define a quantidade de linhas a ser carregada por padrão nas listagens.
     */
    LIMITE_DE_LINHAS: 5,

    /**
     * Placeholder exibido nas inputs.
     */
    INPUT_DE_BUSCA: 'Pesquisar...',

    /**
     * Texto exibido quando nenhum registro é encontrado em uma listagem.
     */
    LISTAGEM_VAZIA: 'Nenhum registro encontrado.',

    /**
     * URL base de consulta dos dados da aplicação.
     */
    URL_BASE: 'http://localhost:3333'
}