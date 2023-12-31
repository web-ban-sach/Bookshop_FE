import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Thực hiện chuyển hướng sang trang danh sách và truyền kết quả tìm kiếm
        navigate(`/listBooks?searchQuery=${searchQuery}`);
    };
    return <>
        <form onSubmit={handleSearchSubmit}>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="default-search" className="block p-4 pl-10 w-[500px] h-[35px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bạn muốn tìm gì..." required />
                {searchQuery == '' ? <></> : <button type="submit" className="text-white h-[25px] absolute right-2.5 bottom-[5px] bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-s px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>}
            </div>
        </form>
    </>
}

export default SearchInput
