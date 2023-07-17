import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { Layout } from "./Pages/Layout";
import PageNotFound from "./Components/PageNotFound";
import Products from "./Components/Products";
import Shop from "./Pages/Shop";
import AboutUs from "./Pages/AboutUs";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import Users from "./Pages/Users";
import ViewUser from "./Pages/ViewUser";
import ViewProduct from "./Components/ViewProduct";
import EditUser from "./Pages/EditUser";
import NewUser from "./Pages/NewUser";
import NewProduct from "./Components/NewProduct";
import EditProduct from "./Pages/EditProduct";
import AuthProvider from "./context/AuthContext";
import CheckUser from "./Components/CheckUser";
import UserProvider from "./context/UserInfo";
import EditProfile from "./Pages/EditProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />,
      },
      {
        path: "editProfile/:id",
        element: <EditProfile />,
      },
      {
        path: "/dashboard",
        element: (
          <CheckUser>
            <Dashboard />
          </CheckUser>
        ),
        children: [
          {
            path: "users",
            element: <Users />,
            children: [
              {
                path: "adduser",
                element: <NewUser />,
              },
              {
                path: "viewuser/:id",
                element: <ViewUser />,
              },
              {
                path: "edituser/:id",
                element: <EditUser />,
              },
            ],
          },
          {
            path: "products",
            element: <Products />,
            children: [
              {
                path: "addproduct",
                element: <NewProduct />,
              },
              {
                path: "viewproduct/:id",
                element: <ViewProduct />,
              },
              {
                path: "editproduct/:id",
                element: <EditProduct />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
