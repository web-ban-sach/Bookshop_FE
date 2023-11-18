import { MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../../api/user/auth.api';

const UserProfile = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [user, setUser] = useState('')

    useEffect(() => {
        const decode = async () => {
            const response = await decodeToken(token)
            setUser(response.data.data);
        }
        decode()
    }, [token])

    const handleLogout = () => {
        // Xóa token từ localStorage
        localStorage.removeItem('token');
        window.alert('Đã đăng xuất!')
        navigate('/auth/login')
    };

    return <>
        <title>Profile</title>
        <div className='flex gap-8'>
            <MDBCard className="w-[25%] py-5 bg-slate-100 rounded-xl">
                <MDBCardBody className="flex flex-col m-auto text-center">
                    <MDBCardImage
                        src={user?.avatar || 'https://res.cloudinary.com/dyewrrq39/image/upload/v1700105007/bookshop/zsvvhe07vdiolrwrwpd5.png'}
                        alt="avatar"
                        className="rounded-full mx-auto mb-5"
                        style={{ width: '150px' }}
                        fluid />
                    <p className=" text-xl mb-1 font-bold">{user?.fullname || '( Thiếu )'}</p>
                    <p className="text-muted mb-4">{user?.email || '( Thiếu )'}</p>
                </MDBCardBody>
            </MDBCard>
            <dl className="-my-3 mt-3 divide-y w-[75%] divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Fullname</dt>
                    <dd className="text-gray-700 sm:col-span-2">{user?.fullname || <span className=' text-gray-300'>( Thiếu )</span>}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Email</dt>
                    <dd className="text-gray-700 sm:col-span-2">{user?.email || <span className=' text-gray-300'>( Thiếu )</span>}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Address</dt>
                    <dd className="text-gray-700 sm:col-span-2">{user?.address || <span className=' text-gray-300'>( Thiếu )</span>}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Phone</dt>
                    <dd className="text-gray-700 sm:col-span-2">{user?.phone || <span className=' text-gray-300'>( Thiếu )</span>}</dd>
                </div>

                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <div className="font-medium w-full flex text-gray-900">
                        <Link to={`/account/changeInfo/${user._id}`} className="mr-5">
                            <button
                                className="text-white leading-[30px] text-center sm:col-span-2 bg-yellow-500 w-[90px] hover:text-white hover:bg-yellow-400 hover:shadow-lg hover:shadow-gray-300 h-[30px] rounded-md">
                                Chỉnh sửa
                            </button>
                        </Link>
                        <Link to={`/account/changePassword/${user._id}`} className="mr-5">
                            <button
                                className="text-white leading-[30px] text-center sm:col-span-2 bg-yellow-500 w-[110px] hover:text-white hover:bg-yellow-400 hover:shadow-lg hover:shadow-gray-300 h-[30px] rounded-md">
                                Đổi mật khẩu
                            </button>
                        </Link>
                        <Link onClick={handleLogout} className="mr-5">
                            <button
                                className="text-white leading-[30px] text-center sm:col-span-2 bg-red-600 w-[110px] hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-gray-300 h-[30px] rounded-md">
                                Đăng xuất
                            </button>
                        </Link>
                    </div>
                </div>
            </dl>
        </div>
    </>
}

export default UserProfile
