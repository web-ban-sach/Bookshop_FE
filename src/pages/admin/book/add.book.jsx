import { ArrowRightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { useEffect, useState } from "react";
import { getCategories } from "../../../api/book/category.api";
import { getAuthors } from "../../../api/book/author.api";
import { getPublishers } from "../../../api/book/publisher.api";
import TextArea from "antd/es/input/TextArea";
import { addBook } from "../../../api/book/book.api";

const AddBook = () => {
    const [categories, setCategory] = useState('')
    const [authors, setAuthor] = useState('')
    const [publishers, setPublisher] = useState('')

    useEffect(() => {
        getCategories().then((res) => {
            setCategory(res.data);
        })
        getAuthors().then((res) => {
            setAuthor(res.data)
        })
        getPublishers().then((res) => {
            setPublisher(res.data)
        })
    }, [])

    const formatCurrency = (value) => {
        // Chuyển đổi giá trị số thành chuỗi có định dạng "100.000 VND"
        return value.toLocaleString('vi-VN') + ' VND';
    };
    const parseCurrency = (value) => {
        // Loại bỏ các ký tự không phải là số từ chuỗi và chuyển đổi thành số
        const parsedValue = value.replace(/[^\d]/g, '');
        return isNaN(parsedValue) ? 0 : parseInt(parsedValue, 10);
    };

    const onFinish = async (values) => {
        const formData = new FormData();

        // Thêm từng trường dữ liệu vào FormData
        Object.entries(values).forEach(([key, value]) => {
            // Đối với trường kiểu mảng, thêm từng phần tử
            if (key === 'thumbnail' && value instanceof File) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((element) => {
                    formData.append(`${key}[]`, element);
                })
            } else {
                formData.append(key, value)
            }
        })

        await addBook(formData)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Thêm được rồi');
            })
            .catch(error => console.error('Error:', error));
    };

    return <>
        <div className=' flex justify-between h-40px leading-[40px] mb-5'>
            <h1 className=' font-bold text-[25px]'>Add a new book</h1>
            <Link to={'/admin/book/list'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to list <ArrowRightOutlined /></Link>
        </div>
        <Form
            initialValues={{ sale: 0 }}
            onFinish={onFinish}
            className=" m-auto"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            style={{
                maxWidth: 600,
            }}>
            <Form.Item label="Tên sách"
                name="book_title"
                rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
            >
                <Input placeholder="Nhập tên sách" />
            </Form.Item>
            <Form.Item label="Danh mục"
                name="category_id"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
                <Select
                    showSearch
                    placeholder={'Chọn danh mục'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children
                            .toString()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .indexOf(
                                input
                                    .toString()
                                    .normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, '')
                                    .toLowerCase()
                            ) >= 0}
                >
                    {
                        Array.isArray(categories.data) && categories.data?.map((category) => {
                            return <Select.Option key={category._id} value={category._id}>{category.category_name}</Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item label="Tác giả"
                name="author_id"
                rules={[{ required: true, message: 'Vui lòng chọn tác giả!' }]}>
                <Select
                    mode="multiple"
                    placeholder={'Chọn tác giả'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children
                            .toString()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .indexOf(
                                input
                                    .toString()
                                    .normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, '')
                                    .toLowerCase()
                            ) >= 0}
                >
                    {
                        Array.isArray(authors.data) && authors.data?.map((author) => {
                            return <Select.Option key={author._id} value={author._id}>{author.author_name}</Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item label="Nhà xuất bản"
                name="publisher_id"
                rules={[{ required: true, message: 'Vui lòng chọn nhà xuất bản!' }]}>
                <Select
                    showSearch
                    placeholder={'Chọn nhà xuất bản'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children
                            .toString()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .indexOf(
                                input
                                    .toString()
                                    .normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, '')
                                    .toLowerCase()
                            ) >= 0}
                >
                    {
                        Array.isArray(publishers.data) && publishers.data?.map((publisher) => {
                            return <Select.Option key={publisher._id} value={publisher._id}>{publisher.publisher_name}</Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
                <InputNumber
                    className=" w-40"
                    min={0} />
            </Form.Item>
            <Form.Item label="Giá"
                name="old_price"
                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                <InputNumber
                    className=" w-40"
                    min={0}
                    formatter={formatCurrency}
                    parser={parseCurrency} />
            </Form.Item>
            <Form.Item label="Sale"
                name="sale">
                <InputNumber defaultValue={0}
                    className=" w-40"
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace('%', '')} />
            </Form.Item>
            <Form.Item
                label="Thumbnail"
                name="thumbnail"
                rules={[{ required: true, message: 'Vui lòng thêm ảnh!' }]}
            >
                <input className="w-full p-1 rounded text-sm border border-gray-200 hover:border-blue-400" type="file" />
            </Form.Item>
            <Form.Item label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                <TextArea rows={3} placeholder="Nhập mô tả về sách" />
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default AddBook
