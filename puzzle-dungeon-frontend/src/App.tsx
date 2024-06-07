import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PuzzleMain from "./pages/puzzle-page/puzzle-main";

import "./sass/main.scss";
import Root from "./root/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PuzzleMain />,
    children: [
      {
        path: "",
        element: <PuzzleMain />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
