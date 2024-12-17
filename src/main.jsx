import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
// import ThemeProvider from "./context/ThemeContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";

import Layout from "./components/Layout.jsx";
import AdminDashboardLayout from "./components/admin/AdminDashboardLayout.jsx"; // Import AdminDashboardLayout
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Signout from "./components/Signout.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import RegistrationConfirmation from "./components/RegistrationConfirmation.jsx";
import Profile from "./components/Profile.jsx";
import Blog from "./components/Blog.jsx";
import FlowerDetail from "./components/FlowerDetail.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Order from "./components/Order.jsx";
import FlowersManagement from "./components/admin/FlowersManagement.jsx";
import FlowerForm from "./components/admin/Flowerform.jsx";
import OrderManagement from "./components/admin/OrderManagement.jsx";

document.body.style.backgroundColor = "#a3d4d3";

const router = createBrowserRouter([
  // Main User Routes
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://127.0.0.1:8000/api/flower/"),
      },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "signout", element: <Signout /> },
      { path: "password_reset", element: <ForgotPassword /> },
      { path: "password-reset/:token", element: <ResetPassword /> },
      { path: "confirmation", element: <RegistrationConfirmation /> },
      { path: "profile", element: <Profile /> },
      { path: "blog", element: <Blog /> },
      {
        path: "cart",
        element: <Cart />,
        loader: () => fetch("http://127.0.0.1:8000/api/cart/"),
      },
      { path: "flower/:id", element: <FlowerDetail /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order", element: <Order /> },
    ],
  },

  // Admin Routes (Separate Layout)
  {
    path: "/admin",
    element: <AdminDashboardLayout />, // Admin-specific layout
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "flowers", element: <FlowersManagement /> },
      { path: "flowers/add", element: <FlowerForm/> },
      { path: "OrderManagement", element: <OrderManagement/> },
      // Add other admin-specific routes here
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        
          <RouterProvider router={router} />
       
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
