import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: { //A cor primária é utilizada em coisas com mais destaques.
            main: yellow[700],
            dark: yellow[800], //Quando passamos o mouse por cima do componente, ele fica um pouco mais escuro, e é essa cor que será aplicada quando o componente escurecer.
            light: yellow[500],
            contrastText: '#FFFFFF', //Essa cor serve para fazer contraste com a cor primária, ou seja, se formos ler um texto, esse texto deverá estar em contraste com a cor de fundo, para permitir a leitura do texto sem muito esforço. Ela fará contraste com a cor "main".
        },
        secondary: { //Essas cores são utilizadas em materiais com um menor destaque.
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#FFFFFF'
        },
        background: {
            default: '#F7F6F3', //O "default" será a cor de fundo do site.
            paper: '#FFFFFF' //O "paper" será a cor do fundo do card.
        }
    }
});