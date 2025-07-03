import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import ErrorPage from "../components/common/ErrorPage/ErrorPage";
import Login from "@/Pages/Login/Login";
import Register from "@/Pages/Register/Register";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import Chat from "@/components/Chat";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: <DashboardLayout />,
  //   children: [
  //     {
  //       path: "/dashboard/admin",
  //       element: <div>Admin</div>,
  //     },
  //   ],
  // },
]);
