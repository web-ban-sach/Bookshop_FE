import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getBookById } from "../api/book/book.api"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Image } from "antd"
import FormComment from "../components/Comment/form-comment"
import { decodeToken } from "../api/user/auth.api"
import { addCart } from "../api/common/cart.api"

const DetailsPage = () => {
    const [book, setBook] = useState('')
    const [user_id, setUserId] = useState('')

    const { id } = useParams()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            await getBookById(id)
                .then((res) => {
                    setBook(res.data.data);
                })
        }
        fetchData()
    }, [id])

    useEffect(() => {
        if (token) {
            decodeToken(token)
                .then((res) => {
                    setUserId(res.data.data._id);
                })
        }

    }, [token])

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(book.old_price);
    const formattedNewPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(book.new_price);

    return <>
        <title>{book.book_title} | BookStore</title>
        <div className=' flex justify-between h-40px leading-[40px] mb-5'>
            <h1 className='flex font-bold text-[20px]'><span className="max-w-[300px] overflow-hidden overflow-ellipsis line-clamp-1">{book.book_title} </span>-{book.author_id?.map((author, index) => {
                return <span key={index}>
                    {author.author_name}
                    {index < book.author_id.length - 1 && ', '}
                </span>
            })}</h1>
            <Link className=' text-blue-400 leading-2 hover:text-blue-600'
                onClick={() => window.history.back()}>
                Back <ArrowRightOutlined />
            </Link>
        </div>
        <div className="flex gap-8">
            <div className="flex flex-col w-[20%]">
                <Image
                    className="w-[100%] mt-3 h-auto"
                    width={200}
                    src={book.thumbnail}
                />
                <div className="mt-6">
                    {!token
                        ? < Link to={'/auth/login'}>
                            <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
                                Login to buy
                            </Button>
                        </Link>
                        : <Button onClick={async () => {
                            const data = { user_id, book_id: id, quantity: 1 }
                            await addCart(data).then(() => {
                                window.alert("Đã thêm vào giỏ hàng!")
                            })
                        }} className=" border-blue-500 text-blue-500" htmlType="submit">
                            Add to cart
                        </Button>
                    }
                </div>
            </div>
            <dl className="-my-3 mt-3 divide-y w-[80%] divide-gray-100 text-sm">
                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Tên sách</dt>
                    <dd className="text-gray-700 sm:col-span-2">{book.book_title}</dd>
                </div>

                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Danh mục</dt>
                    <Link to={'/'}>
                        <dd className="text-gray-700 sm:col-span-2 hover:underline hover:text-blue-400">{book.category_id?.category_name}</dd>
                    </Link>
                </div>

                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Tác giả</dt>

                    <dd className="text-gray-700 sm:col-span-2">
                        {book.author_id?.map((author, index) => {
                            return <span key={index}>
                                <Link to={'/'} className=" hover:underline hover:text-blue-400">
                                    {author.author_name}
                                </Link>
                                {index < book.author_id.length - 1 && ', '}
                            </span>
                        })}
                    </dd>

                </div>

                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Nhà xuất bản</dt>
                    <dd className="text-gray-700 sm:col-span-2">{book.publisher_id?.publisher_name}</dd>
                </div>
                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Giá</dt>
                    <div className="flex items-center justify-start">
                        <div className="flex items-center">
                            <p className=" text-sm font-bold text-red-500">{formattedNewPrice}</p>
                            <del className=" text-xs text-gray-400">{formattedPrice}</del>
                        </div>
                        <p className=" w-7 h-7 p-[2px] ml-2 leading-6 bg-red-500 text-[10px] text-white rounded-full">-{book.sale}%</p>
                    </div>
                </div>
                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Trạng thái</dt>
                    {book.quantity == 0
                        ? <dd className="text-gray-700 sm:col-span-2">Hết hàng</dd>
                        : <dd className="text-gray-700 sm:col-span-2">Còn hàng</dd>}

                </div>
                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Mô tả</dt>
                    <dd className="text-gray-700 sm:col-span-2">{book.description}</dd>
                </div>

            </dl>
        </div>
        <section className=" mt-10 p-3 bg-slate-100 rounded-lg">
            <FormComment book_id={id} />
        </section >
    </>
}

export default DetailsPage
