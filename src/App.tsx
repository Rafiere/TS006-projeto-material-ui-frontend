/**
 * Quando trocamos o "function App()" pelo
 * "export const App", ajudamos o Visual Studio Code a
 * autocompletar o código de uma melhor maneira.
 */

import { BrowserRouter } from "react-router-dom"
import './shared/forms/TraducoesYup'; //Esse import serve para adicionar as mensagens de erro traduzidas para o Yup.
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { DrawerProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>

            <AppRoutes />

          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
