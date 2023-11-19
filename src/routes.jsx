import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./components/layouts/UserLayout";
import HomePage from "./pages/home.page";
import { LoginPage } from "./pages/auth/login.page";
import { RegisterPage } from "./pages/auth/register.page";
import { NotFoundPage } from "./pages/not-found.page";
import AdminLayout from "./components/layouts/AdminLayout";
import CheckRole from "./helper/checkRole";
import ListBook from "./pages/admin/book/list-book";
import AddBook from "./pages/admin/book/add-book";
import EditBook from "./pages/admin/book/edit-book";
import AuthLayout from "./components/layouts/AuthLayout";
import DetailsBook from "./pages/admin/book/details-book";
import ListAuthor from "./pages/admin/author/list-author";
import AddAuthor from "./pages/admin/author/add-author";
import EditAuthor from "./pages/admin/author/edit-author";
import DetailsAuthor from "./pages/admin/author/details-author";
import ListCategory from "./pages/admin/category/list-category";
import AddCategory from "./pages/admin/category/add-category";
import EditCategory from "./pages/admin/category/edit-category";
import DetailsCategory from "./pages/admin/category/details-category";
import ListPublisher from "./pages/admin/publisher/list-publisher";
import AddPublisher from "./pages/admin/publisher/add-publisher";
import EditPublisher from "./pages/admin/publisher/edit-publisher";
import DetailsPublisher from "./pages/admin/publisher/details-publisher";
import ListPage from "./pages/list.page";
import DetailsPage from "./pages/details-book.page";
import AccountLayout from "./components/layouts/AccountLayout";
import UserProfile from "./pages/account/account-info.page";
import ChangePassword from "./pages/account/change-password";
import ChangeInfo from "./pages/account/change-info";
import CartLayout from "./components/layouts/CartLayout";
import CartPage from "./pages/cart.page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "listBooks", element: <ListPage /> },
            { path: "detailsBook/:id", element: <DetailsPage /> },
        ]
    },
    {
        path: "/cart",
        element: <CartLayout />,
        children: [
            { path: "", element: <CartPage /> }
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
                    { path: 'edit/:id', element: <EditBook /> },
                    { path: 'details/:id', element: <DetailsBook /> }
                ]
            },
            {
                path: 'author', children: [
                    { path: 'list', element: <ListAuthor /> },
                    { path: 'add', element: <AddAuthor /> },
                    { path: 'edit/:id', element: <EditAuthor /> },
                    { path: 'details/:id', element: <DetailsAuthor /> }
                ]
            },
            {
                path: 'category', children: [
                    { path: 'list', element: <ListCategory /> },
                    { path: 'add', element: <AddCategory /> },
                    { path: 'edit/:id', element: <EditCategory /> },
                    { path: 'details/:id', element: <DetailsCategory /> }
                ]
            },
            {
                path: 'publisher', children: [
                    { path: 'list', element: <ListPublisher /> },
                    { path: 'add', element: <AddPublisher /> },
                    { path: 'edit/:id', element: <EditPublisher /> },
                    { path: 'details/:id', element: <DetailsPublisher /> }
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
    {
        path: "/account",
        element: <AccountLayout />,
        children: [
            { path: "profile", element: <UserProfile /> },
            { path: "changePassword/:id", element: <ChangePassword /> },
            { path: "changeInfo/:id", element: <ChangeInfo /> },
        ]
    },
    { path: "*", element: <NotFoundPage /> }
])
