import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import Admin from './pages/Admin.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx'; // <--- updated import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardIndex from './pages/index.jsx';
import StartWeb from './pages/Start.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import CartDemo from './pages/Cart-demo.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';


const router = createBrowserRouter([
  { path: "/", element: <StartWeb />},
  { path: "/Register", element: <Register /> },
  { path: "/LoginPage", element: <LoginPage /> },

  {
    path: "/Dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/index",
    element: (
      <ProtectedRoute>
        <DashboardIndex /> {/* use index.jsx for dashboard */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/Start",
    element: (
      <ProtectedRoute>
        <StartWeb /> {/* use Start.jsx for Start */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/Inventory",
    element: (
      <ProtectedRoute>
        <Inventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ShoppingCart",
    element: (
      <ProtectedRoute>
        <ShoppingCart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Cart-demo",
    element: (
      <ProtectedRoute>
        <CartDemo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/UserDashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/AdminDashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);