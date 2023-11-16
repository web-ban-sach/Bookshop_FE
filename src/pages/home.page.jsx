import { useEffect, useState } from "react"
import { getBooks } from "../api/book/book.api"
import { Link } from "react-router-dom"

const HomePage = () => {
    const [books, setBook] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const book = await getBooks()
            if (!books) {
                setBook(book)
            }
        }
        fetchData()
    }, [books])

    return <>
        {books?.data?.data.map((book) => {
            const formattedPrice = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(book.old_price);
            const formattedNewPrice = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(book.new_price);

            return <div key={book._id} className=" w-48 p-4 rounded-lg hover:shadow-lg">
                <title>Trang chủ</title>
                <img className=" px-8 mb-2" src={book.thumbnail} alt="" />
                <Link to={'/'}><p className=" text-sm leading-4 h-8 overflow-hidden overflow-ellipsis line-clamp-2 hover:text-blue-800 hover:underline">{book.book_title}</p></Link>
                {book.author_id.length === 1 && book.author_id.map((author) => {
                    return <Link to={'/'} key={author._id}><p className=" text-xs mt-1 text-green-500 font-bold hover:underline overflow-hidden overflow-ellipsis whitespace-nowrap">{author.author_name}</p></Link>
                })

                    || <p className=" text-xs mt-1 text-green-500 font-bold hover:underline overflow-hidden overflow-ellipsis whitespace-nowrap">Nhiều tác giả</p>
                }
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <p className=" text-sm font-bold text-red-500">{formattedNewPrice}</p>
                        <del className=" text-xs text-gray-400">{formattedPrice}</del>
                    </div>
                    <p className=" w-7 h-7 p-[2px] leading-6 bg-red-500 text-[10px] text-white rounded-full">-{book.sale}%</p>
                </div>

            </div>
        })}
    </>
}

export default HomePage
