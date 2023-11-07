import { useRoutes } from "react-router-dom";
import ThemeProvider from "./hooks/ThemeProvider";
import TicTacToeRoutes from "./TicTacToeRoutes";

export default function App() {
  const routes = useRoutes([
    {
      path: "/*",
      element: (
        <ThemeProvider>
          <TicTacToeRoutes />
        </ThemeProvider>
      ),
    },
  ]);

  return routes;
}
