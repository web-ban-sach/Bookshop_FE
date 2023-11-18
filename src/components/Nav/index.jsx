import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons"
import { decodeToken } from "../../api/user/auth.api"

export const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        // Kiểm tra xem token đã lưu trong localStorage hay không
        const token = localStorage.getItem('token');
        decodeToken(token).then((res) => {
            setRole(res.data.data.role)
        })
        // Nếu có token, đặt trạng thái đăng nhập thành true
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn, role]);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        // Xóa token từ localStorage
        localStorage.removeItem('token');
        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(false);
        window.alert('Đã đăng xuất!')
        navigate('/auth/login')
    };

    return <>
        <img src="https://res.cloudinary.com/dyewrrq39/image/upload/v1700028148/bookshop/xwxltv5sphthdkkagniz.png" alt="" />
        <nav className="flex justify-end items-center bg-gray-200 px-5 h-[40px] space-x-4">
            <Link to={'/'} className="flex items-center rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                <ShoppingOutlined className=" w-4 mr-2" /> Giỏ hàng
            </Link>
            {isLoggedIn ? (// Hiển thị nút thông tin tài khoản và nút đăng xuất nếu đã đăng nhập
                <>
                    {role === 'ADMIN' ? (
                        <Link to={'/admin'} className="flex items-center rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Quản trị
                        </Link>
                    ) : (
                        <Link to={'/account/profile'} className="flex items-center rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                            <UserOutlined className=" w-4 mr-2" /> Thông tin tài khoản
                        </Link>
                    )}
                    <Link onClick={handleLogout} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                        <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg> Đăng xuất
                    </Link>
                </>) : (<>
                    <Link to={'/auth/login'} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                        <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg> Đăng nhập
                    </Link>
                    <Link to={'/auth/register'} className="flex rounded-md text-sm hover:bg-white px-3 py-1 m-1 leading-5">
                        <svg className=" w-4 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg> Đăng ký
                    </Link>
                </>)}

        </nav>
    </>
}
