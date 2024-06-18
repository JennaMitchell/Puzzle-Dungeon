import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PuzzleMain from "./pages/puzzle-page/puzzle-page";

import "./sass/main.scss";
import Root from "./root/root";
import MessagePopup from "./library/popups/message/message-popup";
import { useAppSelector } from "./library/store/typescript-hooks";

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
  const messagePopupActive = useAppSelector(
    (state) => state.popups.messagePopupActive
  );
  return (
    <main>
      {messagePopupActive && <MessagePopup />}
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
