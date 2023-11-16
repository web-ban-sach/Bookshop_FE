import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./components/layouts/UserLayout";
import HomePage from "./pages/home.page";
import { LoginPage } from "./pages/user/login.page";
import { RegisterPage } from "./pages/user/register.page";
import { NotFoundPage } from "./pages/not-found.page";
import AdminLayout from "./components/layouts/AdminLayout";
import CheckRole from "./helper/checkRole";
import ListBook from "./pages/admin/book/list-book";
import AddBook from "./pages/admin/book/add.book";
import EditBook from "./pages/admin/book/edit-book";
import AuthLayout from "./components/layouts/AuthLayout";
import DetailsBook from "./pages/admin/book/details-book";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            { path: "/", element: <HomePage /> },
        ]
    },
    {
        path: "/admin",
        element: <CheckRole element={<AdminLayout />} />,
        children: [
            {
                path: 'book', children: [
                    { path: 'list', element: <ListBook /> },
                    { path: 'add', element: <AddBook /> },
                    { path: 'edit', element: <EditBook /> },
                    { path: 'details/:id', element: <DetailsBook /> }
                ]
            },

        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
        ]
    },
    { path: "*", element: <NotFoundPage /> }
])
