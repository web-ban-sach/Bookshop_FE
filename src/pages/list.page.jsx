import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import { getBooks, searchBook } from "../api/book/book.api";

let currentData

const ListPage = () => {
    const location = useLocation();
    const [books, setBook] = useState('')
    const [dataList, setDataList] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    // Sử dụng useEffect để lấy giá trị searchQuery khi location thay đổi
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('searchQuery');

        // Log giá trị searchQuery để kiểm tra
        if (!searchQuery) {
            const fetchData = async () => {
                try {
                    const books = await getBooks();
                    setBook(books);
                    setDataList(books.data.data)
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            fetchData();
        } else {
            setQuery(searchQuery)
            const fetchData = async () => {
                try {
                    const results = await searchBook(searchQuery);
                    setSearchResults(results);
                    setDataList(results.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            fetchData();
        }
    }, [location.search]);

    // Số mục dữ liệu mỗi trang
    const itemsPerPage = 10;
    // State để theo dõi trang hiện tại
    const [currentPage, setCurrentPage] = useState(1)
    // Tính chỉ mục bắt đầu và chỉ mục kết thúc của dữ liệu hiển thị trên trang
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Lọc dữ liệu để hiển thị chỉ các mục trong khoảng startIndex và endIndex
    if (searchResults?.data) {
        currentData = searchResults.data.slice(startIndex, endIndex);
    } else {
        currentData = books?.data?.data.slice(startIndex, endIndex);
    }

    // Xử lý sự kiện khi trang thay đổi
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <title className="font-bold text-lg my-4">{query ? `Kết quả tìm kiếm cho "${query}"` : 'Tất cả sách'}</title>
            <section>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg my-4">{query ? `Kết quả tìm kiếm cho "${query}"` : 'Tất cả sách'}</h1>
                    <Pagination
                        defaultCurrent={1}
                        total={dataList.length}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                    />
                </div>
                <div className=" flex flex-wrap-reverse">
                    {currentData?.length == 0 ? <div>Không tìm thấy kết quả nào cho &ldquo;{query}&rdquo;</div> : currentData?.map((book) => {
                        return <Card key={book._id} {...book} />
                    })}
                </div>
            </section>
        </>
    );
}

export default ListPage
