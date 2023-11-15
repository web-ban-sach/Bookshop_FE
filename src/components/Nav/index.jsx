import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        // Kiểm tra xem token đã lưu trong localStorage hay không
        const token = localStorage.getItem('token');

        // Nếu có token, đặt trạng thái đăng nhập thành true
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        // Xóa token từ localStorage
        localStorage.removeItem('token');

        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(false);
    };

    return <>
        <img src="https://res.cloudinary.com/dyewrrq39/image/upload/v1700028148/bookshop/xwxltv5sphthdkkagniz.png" alt="" />
        <nav className="flex justify-end items-center bg-gray-200 px-5 h-[40px] space-x-4">
            <Link to={'/'} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg> Giỏ hàng
            </Link>
            {isLoggedIn ? (// Hiển thị nút thông tin tài khoản và nút đăng xuất nếu đã đăng nhập
                <>
                    <Link to={'/user/account'} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                        <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg> Thông tin tài khoản
                    </Link>
                    <a onClick={handleLogout} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                        <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg> Đăng xuất
                    </a>
                </>) : (<>
                    <Link to={'/user/login'} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                        <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg> Đăng nhập
                    </Link>
                    <Link to={'/user/register'} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                        <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg> Đăng ký
                    </Link>
                </>)}

        </nav>
    </>
}
