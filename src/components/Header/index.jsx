import { Link } from "react-router-dom"
import SearchInput from "../Input/search.component"
import { Button } from "antd"

const Header = () => {
    return <>
        <header className="bg-white text-white py-2 mb-10 shadow-md shadow-gray-400">
            <div className="container mx-auto px-[50px] flex justify-between items-center">
                <Link to={'/'} className="text-2xl font-bold">
                    <img className="w-[120px]" src="https://res.cloudinary.com/dyewrrq39/image/upload/v1699954671/bookshop/gxwg1z51r02g4fiybngr.png" alt="" />
                </Link>
                <SearchInput />
                <nav>
                    <Link to={'/'}>
                        <Button className="border-none shadow-none text-base">HOME</Button>
                    </Link>
                    <Link to={'/listBooks'}>
                        <Button className="border-none shadow-none text-base">BOOKS</Button>
                    </Link>
                </nav>
            </div>
        </header >
    </>
}

export default Header
