import { useEffect, useState } from "react";
import { Loaders } from "../Loaders";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay for loading
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, [loading]);

    return <>
        {loading ? <Loaders /> : <Outlet />}
    </>
}

export default AuthLayout
