import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./components/layouts/UserLayout";
import HomePage from "./pages/home.page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            {path:"/detail/:id"}
        ]
    }
])
