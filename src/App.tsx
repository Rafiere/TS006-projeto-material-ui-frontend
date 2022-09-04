/**
 * Quando trocamos o "function App()" pelo
 * "export const App", ajudamos o Visual Studio Code a
 * autocompletar o código de uma melhor maneira.
 */

import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
