import { BarraDeFerramentas } from "../../shared/components";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {

    return (
        <LayoutBaseDePagina titulo="Página Inicial"
        barraDeFerramentas=
        {(<BarraDeFerramentas mostrarInputBuscar
        textoBotaoNovo="Nova"/>)}>

            <FerramentasDeDetalhe mostrarBotaoSalvarEFechar/>

        </LayoutBaseDePagina>
    );
}