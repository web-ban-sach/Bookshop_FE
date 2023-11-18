import { useEffect, useState } from "react"
import { getBooks } from "../api/book/book.api"
import { Slider } from "../components/Slider";
import { Pagination } from "antd";
import Card from "../components/Card";

const HomePage = () => {
    const [books, setBook] = useState('')
    const [dataList, setDataList] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const book = await getBooks()
            if (!dataList) {
                setBook(book)
                setDataList(book?.data?.data)
            }
        }
        fetchData()
    }, [dataList])

    // Số mục dữ liệu mỗi trang
    const itemsPerPage = 5;
    // State để theo dõi trang hiện tại
    const [currentPage, setCurrentPage] = useState(1)
    // Tính chỉ mục bắt đầu và chỉ mục kết thúc của dữ liệu hiển thị trên trang
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Lọc dữ liệu để hiển thị chỉ các mục trong khoảng startIndex và endIndex
    const currentData = books?.data?.data.slice(startIndex, endIndex);
    // Xử lý sự kiện khi trang thay đổi
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return <>
        <title>Trang chủ</title>
        <section>
            <Slider />
        </section>
        <section>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg my-4">Sách mới</h1>
                <Pagination
                    defaultCurrent={1}
                    total={dataList.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                />
            </div>
            <div className=" flex flex-wrap-reverse">
                {currentData?.map((book) => {
                    return <Card key={book._id} {...book} />
                })}
            </div>
        </section>

    </>
}

export default HomePage
