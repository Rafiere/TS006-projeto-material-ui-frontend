/**
 * Quando trocamos o "function App()" pelo
 * "export const App", ajudamos o Visual Studio Code a
 * autocompletar o código de uma melhor maneira.
 */

import { BrowserRouter } from "react-router-dom"
import './shared/forms/TraducoesYup'; //Esse import serve para adicionar as mensagens de erro traduzidas para o Yup.
import { AppRoutes } from "./routes";
import { Login, MenuLateral } from "./shared/components";
import { DrawerProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { AuthProvider } from "./shared/contexts/AuthContext";

//Se não estamos autenticados no sistema, todos os filhos do componente "Login" não serão exibidos.

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>

                <AppRoutes />

              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
