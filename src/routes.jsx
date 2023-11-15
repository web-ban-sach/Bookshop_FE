import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./components/layouts/UserLayout";
import HomePage from "./pages/home.page";
import { LoginPage } from "./pages/user/login.page";
import { RegisterPage } from "./pages/user/register.page";
import { NotFoundPage } from "./pages/not-found.page";
import AdminLayout from "./components/layouts/AdminLayout";
import CheckRole from "./helper/checkRole";

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
        element: <CheckRole element={<AdminLayout />} />
    },
    { path: "/user/login", element: <LoginPage /> },
    { path: "/user/register", element: <RegisterPage /> },
    { path: "*", element: <NotFoundPage /> }
])
