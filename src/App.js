import Stack from "./pages/Stack";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";

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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "stack",
        element: <Stack />,
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
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
