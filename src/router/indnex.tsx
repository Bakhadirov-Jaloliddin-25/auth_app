import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Users from "../pages/Users";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Auth from "../pages/Auth";

const Routers = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: <Auth />,
          children: [
            {
              path: "/",
              element: <Layout />,
              children: [
                {
                  path: "/",
                  element: <Home />,
                },
                {
                  path: "/users",
                  element: <Users />,
                },
                {
                  path: "/products",
                  element: <Products />,
                },
              ],
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
      ])}
    </>
  );
};

export default Routers;
