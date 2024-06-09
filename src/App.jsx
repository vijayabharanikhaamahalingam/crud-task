
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as todosLoader } from "./assets/pages/Todos";
import Todos from "./assets/pages/Todos";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />,

    loader: todosLoader
  }
]);


const App = () => {
  return <RouterProvider router={router} />;
}

export default App;