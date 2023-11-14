import SearchInput from "../Input/search.component"

const Header = () => {
    return <>
        <header className=" bg-stone-500 text-white py-2">
            <div className="container mx-auto px-[150px] flex justify-between items-center">

                <div className="text-2xl font-bold">
                    <img className="w-[120px]" src="https://res.cloudinary.com/dyewrrq39/image/upload/v1699954671/bookshop/gxwg1z51r02g4fiybngr.png" alt="" />
                </div>
                <SearchInput />
                <nav className="space-x-4">
                    <a href="#" className="hover:underline">Giỏ hàng</a>
                    <a href="#" className="hover:underline">Đăng nhập</a>
                </nav>
            </div>
        </header>
    </>
}

export default Header
