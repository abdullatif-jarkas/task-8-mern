import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Favorites from "./pages/Favorites";
import OrderList from "./pages/OrderList";
import Products from "./pages/Products/Products";
import ShowProduct from "./pages/Products/ShowProduct/ShowProduct";
import AddProduct from "./pages/Products/AddProduct/AddProduct";
import EditProduct from "./pages/Products/EditProduct/EditProduct";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "products",
        children: [
          {
            path: "",
            element: <Products />,
          },
          {
            path: ":id",
            element: <ShowProduct />,
          },
          {
            path: "add",
            element: <AddProduct />,
          },
          {
            path: "edit/:id",
            element: <EditProduct />,
          },
        ],
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "order-list",
        element: <OrderList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
