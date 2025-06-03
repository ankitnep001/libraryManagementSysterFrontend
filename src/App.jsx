import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminTemplate from '../src/ui/admin/template/AdminTemplate';
import ProtectedRoute from './ProtectedRoute';
import BooksCategory from "./ui/admin/pages/BookCategory";
import BookTable from "./ui/admin/pages/BookTable";
import BorrowedBook from "./ui/admin/pages/BorrwoedBook";
import Dashboard from "./ui/admin/pages/Dashboard";
import UserTable from "./ui/admin/pages/UserTable";
import PageNotFound from "./ui/common/pages/PageNotFound";
import About from "./ui/user/pages/About";
import Login from "./ui/user/pages/auth/Login";
import Signup from "./ui/user/pages/auth/Signup";
import BookDetail from "./ui/user/pages/BookDetail";
import Category from "./ui/user/pages/Category";
import Home from "./ui/user/pages/Home";
import User from "./ui/user/pages/User";
import UserTemplate from "./ui/user/template/UserTemplate";
const router = createBrowserRouter([
  // STUDENT ROUTES
  {
    path: '/',
    // element: <UserTemplate/>,
    children: [
      {
        element: <UserTemplate />,
        children: [
          { index: true, element: <Home /> },
          { path: 'home', element: <Home /> },
          { path: 'category', element: <Category /> },
          { path: 'book/:id', element: <BookDetail /> },  // <-- 👈 Add this line
          { path: 'profile', element: <User /> },
          { path: 'about-us', element: <About /> },

          { path: '*', element: <PageNotFound /> }
        ]
      }
    ]
  },

  // ADMIN ROUTES
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
    children: [
      {
        element: <AdminTemplate />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'users', element: <UserTable /> },
          { path: 'category', element: <BooksCategory /> },
          { path: 'books', element: <BookTable /> },
          { path: 'borrowed-books', element: <BorrowedBook /> },
          { path: '*', element: <PageNotFound /> }
        ]
      }
    ]
  },

  // AUTH ROUTES
  {
    path: '/auth',
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: '*', element: <PageNotFound /> }
    ]
  }
]);

function App() {
  useEffect(() => {
    // 👇 This runs only once when app loads
    localStorage.setItem('isLoggedIn', 'false');
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
