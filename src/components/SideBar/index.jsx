import { useEffect, useState } from "react"
import { getCategories } from "../../api/book/category.api"
import { getAuthors } from "../../api/book/author.api"
import { Link } from "react-router-dom";
import unidecode from "unidecode"

export const SideBar = () => {
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const category = await getCategories();
                setCategories(category);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategory();
        const fetchAuthor = async () => {
            try {
                const author = await getAuthors();
                setAuthors(author);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchAuthor();
    }, []);

    const convertToUnaccented = (text) => {
        return unidecode(text);
    };

    return <>
        <article className=" bg-white w-[20%] p-3 border-r border-gray-100 shadow-lg rounded-l-lg">
            <div className="font-bold text-xl mb-1">Danh mục</div>
            {
                categories?.data?.data.map((category) => {
                    const nameUnaccented = convertToUnaccented(category.category_name)
                    return < Link to={`/listBooks?searchQuery=${nameUnaccented}`} key={category._id} >
                        <p className=" text-sm mb-1 hover:underline hover:text-blue-400">{category.category_name}</p>
                    </Link>
                })
            }
            <div className="font-bold text-xl mt-5 mb-1">Tác giả tiêu biểu</div>
            {
                authors?.data?.data.map((author) => {
                    const nameUnaccented = convertToUnaccented(author.author_name)
                    return <Link to={`/listBooks?searchQuery=${nameUnaccented}`} key={author._id} >
                        <p className=" text-sm mb-1 hover:underline hover:text-blue-400">{author.author_name}</p>
                    </Link>
                })
            }
        </article >
    </>
}
