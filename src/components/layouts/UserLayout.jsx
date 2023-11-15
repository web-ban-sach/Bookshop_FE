import { useEffect, useState } from "react";
import { Footer } from "../Footer";
import Header from "../Header";
import { Main } from "../Main";
import { Nav } from "../Nav";
import { Loaders } from "../Loaders";

const UserLayout = () => {
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
        {loading ? <Loaders /> : <div className=" bg-gray-200">
            <Nav />
            <Header />
            <Main />
            <Footer />
        </div>}
    </>
}

export default UserLayout
