import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import { getAuthorById, removeAuthor } from "../../../api/book/author.api"

const DetailsAuthor = () => {
    const [author, setAuthor] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAuthorById(id).then((res) => {
            setAuthor(res.data.data);
        })
    }, [id])

    function onRemove() {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

        if (isConfirmed) {
            removeAuthor(id).then(() => {
                window.alert('Xóa thành công!')
                navigate('/admin/author/list')
            })
            console.log("Đã xóa");
        } else {
            console.log("Hủy bỏ xóa");
        }
    }

    return (
        <>
            <div className=' flex justify-between h-40px leading-[40px] mb-5'>
                <h1 className=' font-bold text-[20px]'>Author infomation</h1>
                <Link to={'/admin/author/list'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to list <ArrowRightOutlined /></Link>
            </div>
            <dl className="-my-3 mt-3 divide-y w-[80%] divide-gray-100 text-sm">
                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Tên tác giả</dt>
                    <dd className="text-gray-700 sm:col-span-2">{author.author_name}</dd>
                </div>
                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900">Mô tả về tác giả</dt>
                    <dd className="text-gray-700 sm:col-span-2">{author.description}</dd>
                </div>
                <div
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                    <dt className="font-medium text-gray-900"></dt>
                    <div>
                        <Link to={`/admin/author/edit/${id}`} className="mr-5">
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
        </>
    )
}

export default DetailsAuthor
