import { useEffect, useState } from "react";
import { Footer } from "../Footer";
import Header from "../Header";
import { Nav } from "../Nav";
import { Loaders } from "../Loaders";
import { Outlet, useNavigate } from "react-router-dom";

const AccountLayout = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')

    if (!token) {
        navigate('*')
    }

    useEffect(() => {
        // Simulate a delay for loading
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, [loading]);

    return <>
        {loading ? <Loaders /> : <div className=" bg-gray-200">
            <Nav />
            <Header />
            <main className=" flex px-[150px] border border-gray-200">
                <section className=" bg-white w-[100%] p-8 shadow-lg rounded-lg">
                    <Outlet />
                </section>
            </main>
            <Footer />
        </div>}
    </>
}

export default AccountLayout
