import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>(); //Estamos obtendo o parâmetro "id", que é o ID de uma pessoa, da URL.

    const navigate = useNavigate();

    const handleSave = () => {
        console.log('Saving...');
    }

    const handleDelete = () => {
        console.log('Deleting...');
    }
    
    /**
     * O botão de "Apagar" apenas aparecerá quando estivermos editando uma pessoa já
     * existente na aplicação, ou seja, quando o "ID" for diferente de "nova". Quando o ID é igual
     * a "nova", isso significa que a pessoa está sendo criada, logo, o botão de "Apagar" não deve ser
     * exibido.
     */

    return (
        <LayoutBaseDePagina titulo='Detalhe de Pessoa'
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo = 'Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}
                    aoClicarEmNovo={() => {navigate('/pessoas/detalhe/nova')}}
                    aoClicarEmVoltar={() => {navigate('/pessoas')}}
                    aoClicarEmApagar={() => {}}
                    aoClicarEmSalvar={() => {}}
                    aoClicarEmSalvarEFechar={() => {}}/>
            }>
            <p>Detalhe de Pessoas {id}</p>
        </LayoutBaseDePagina>
    );
}