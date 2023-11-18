import { Link } from "react-router-dom";

const Card = (book) => {
    const { _id, thumbnail, book_title, author_id, old_price, new_price, sale } = book

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(old_price);
    const formattedNewPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(new_price);

    return <>
        <Link to={`/detailsBook/${_id}`} key={_id} className=" basis-1/5 w-48 p-4 rounded-lg hover:shadow-lg">
            <img className=" px-8 mb-2" src={thumbnail} alt="" />
            <p className=" text-sm leading-4 h-8 overflow-hidden overflow-ellipsis line-clamp-2 hover:text-blue-800 hover:underline">{book_title}</p>
            {author_id?.length === 1 && author_id.map((author) => {
                return <Link to={'/'} key={author._id}><p className=" text-xs mt-1 text-green-500 font-bold hover:underline overflow-hidden overflow-ellipsis whitespace-nowrap">{author.author_name}</p></Link>
            })

                || <p className=" text-xs mt-1 text-green-500 font-bold hover:underline overflow-hidden overflow-ellipsis whitespace-nowrap">Nhiều tác giả</p>
            }
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <p className=" text-sm font-bold text-red-500">{formattedNewPrice}</p>
                    <del className=" text-xs text-gray-400">{formattedPrice}</del>
                </div>
                <p className=" w-7 h-7 p-[2px] leading-6 bg-red-500 text-[10px] text-white rounded-full">-{sale}%</p>
            </div>
        </Link>
    </>
}

export default Card
