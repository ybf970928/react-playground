import { createBrowserRouter } from "react-router-dom";
import Redirect from './pages/Features/Redirect'
import App from './App';
import UNDO from './pages/UNDO';
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Playground from './pages/Playground'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Redirect to={ "/undo" } />
      },
      {
        path: "undo",
        index: true,
        element: <UNDO />
      },
      {
        path: 'upload',
        element: <Upload />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'playground',
        element: <Playground />
      }
    ]
  },
]);

export default router