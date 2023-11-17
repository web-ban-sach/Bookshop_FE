import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getBookById, removeBook } from "../../../api/book/book.api"
import { ArrowRightOutlined } from "@ant-design/icons"

const DetailsBook = () => {
    const [book, setBook] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBookById(id).then((res) => {
            setBook(res.data.data);
        })
    }, [id])

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(book.old_price);
    const formattedNewPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(book.new_price);

    function onRemove() {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

        if (isConfirmed) {
            removeBook(id).then(() => {
                window.alert('Xóa thành công!')
                navigate('/admin/book/list')
            })
            console.log("Đã xóa");
        } else {
            console.log("Hủy bỏ xóa");
        }
    }

    return (
        <>
            <div className=' flex justify-between h-40px leading-[40px] mb-5'>
                <h1 className=' font-bold text-[20px]'>{book.book_title} - {book.author_id?.map((author, index) => {
                    return <span key={index}>
                        {author.author_name}
                        {index < book.author_id.length - 1 && ', '}
                    </span>
                })}</h1>
                <Link to={'/admin/book/list'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to list <ArrowRightOutlined /></Link>
            </div>
            <div className="flex gap-8">
                <img className=" w-[20%] mt-3 h-[100%]" src={book.thumbnail} alt="" />
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
                        <dd className="text-gray-700 sm:col-span-2">{book.category_id?.category_name}</dd>
                    </div>

                    <div
                        className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                    >
                        <dt className="font-medium text-gray-900">Tác giả</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            {book.author_id?.map((author, index) => {
                                return <span key={index}>
                                    {author.author_name}
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
                        <dt className="font-medium text-gray-900">Tồn kho</dt>
                        <dd className="text-gray-700 sm:col-span-2">{book.quantity} quyển</dd>
                    </div>
                    <div
                        className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                    >
                        <dt className="font-medium text-gray-900">Mô tả</dt>
                        <dd className="text-gray-700 sm:col-span-2">{book.description}</dd>
                    </div>
                    <div
                        className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                    >
                        <dt className="font-medium text-gray-900"></dt>
                        <div>
                            <Link to={`/admin/book/edit/${id}`} className="mr-5">
                                <button
                                    className="text-white leading-[30px] text-center sm:col-span-2 bg-yellow-500 w-[70px] hover:text-white hover:bg-yellow-400 hover:shadow-lg hover:shadow-gray-300 h-[30px] rounded-md">
                                    Update
                                </button>
                            </Link>
                            <button
                                type='click'
                                onClick={onRemove}
                                className="text-white leading-[30px] text-center sm:col-span-2 bg-red-400 w-[70px] hover:text-gray-200 hover:bg-red-600 hover:shadow-lg hover:shadow-gray-300 h-[30px] rounded-md">
                                Remove
                            </button>
                        </div>

                    </div>
                </dl>
            </div>
        </>
    )
}

export default DetailsBook
