import Stack from "./pages/Stack/Stack";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import SortedBinaryTree from "./pages/SortedBinaryTree/SortedBinaryTree";

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* <Outlet />
      <Footer /> */}
      <div>
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/algoviz",
    element: <Layout />,
    children: [
      {
        path: "stack",
        element: <Stack />,
      },
      {
        path: "sorted_binary_tree",
        element: <SortedBinaryTree />,
      },
    ],
  },
  // {
  //   path: "/stack",
  //   element: <Stack />,
  // },
]);

function App() {
  return (
    <div className="app">
      <div className="container" style={{ width: "100%" }}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
