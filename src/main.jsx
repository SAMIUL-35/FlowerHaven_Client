import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { CartProvider } from "./components/context/CartContext.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";

import Layout from "./components/auth/Layout.jsx";
import AdminDashboardLayout from "./components/admin/AdminDashboardLayout.jsx"; // Import AdminDashboardLayout
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import Home from "./components/auth/Home.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";

import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import RegistrationConfirmation from "./components/auth/RegistrationConfirmation.jsx";
import Profile from "./components/client/Profile.jsx";
import Blog from "./components/extra/Blog.jsx";
import FlowerDetail from "./components/client/FlowerDetail.jsx";
import Cart from "./components/client/Cart.jsx";
import Checkout from "./components/client/Checkout.jsx";
import Order from "./components/client/Order.jsx";
import FlowersManagement from "./components/admin/FlowersManagement.jsx";
import FlowerForm from "./components/admin/Flowerform.jsx";
import OrderManagement from "./components/admin/OrderManagement.jsx";
import ProtectedRoute from "./components/context/ProtectedRoute.jsx";

import AboutUs from "./components/extra/aboutUs.jsx";
import ContactUs from "./components/extra/ContactUs.jsx";

// document.body.style.backgroundColor = "#a3d4d3";

const router = createBrowserRouter([
  // Main User Routes
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://flowerheaven.onrender.com/api/flower/"),
      },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      
      { path: "password_reset", element: <ForgotPassword /> },
      { path: "password-reset/:token", element: <ResetPassword /> },
      { path: "confirmation", element: <RegistrationConfirmation /> },
      { path: "profile", element: <Profile /> },
      { path: "blog", element: <Blog /> },
      {
        path: "cart",
        element: <Cart />,
        loader: () => fetch("https://flowerheaven.onrender.com/api/cart/"),
      },
      { path: "flower/:id", element: <FlowerDetail /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order", element: <Order /> },
     
      {path:"aboutus", element: <AboutUs/>},
      {path:"contactus", element: <ContactUs/>}
    ],
  },

  
  {
    path: "/admin",
    element: < ProtectedRoute element={<AdminDashboardLayout />}  />, 
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
