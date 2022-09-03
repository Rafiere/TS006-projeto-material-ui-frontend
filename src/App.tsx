/**
 * Quando trocamos o "function App()" pelo
 * "export const App", ajudamos o Visual Studio Code a
 * autocompletar o código de uma melhor maneira.
 */

import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
