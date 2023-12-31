import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
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
    const [file, setFile] = useState([]);
    const navigate = useNavigate()

    // Lấy data để fill vào thẻ select danh mục, tác giả, nhà xuất bản
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

    // Định dạng thẻ input giá theo mệnh giá việt
    const formatCurrency = (value) => {
        // Chuyển đổi giá trị số thành chuỗi có định dạng "100.000 VND"
        return value.toLocaleString('vi-VN') + ' VND';
    };
    const parseCurrency = (value) => {
        // Loại bỏ các ký tự không phải là số từ chuỗi và chuyển đổi thành số
        const parsedValue = value.replace(/[^\d]/g, '');
        return isNaN(parsedValue) ? 0 : parseInt(parsedValue, 10);
    };

    // Hàm chạy khi submit form
    const onFinish = async (values) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('upload_preset', 'book_shop'); // Replace with your Cloudinary upload preset
            formData.append('folder', 'bookshop'); // Replace with your desired folder name

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dyewrrq39/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data.secure_url) {
                    await addBook({ ...values, thumbnail: data.secure_url })
                        .then(() => {
                            window.alert("Thêm sách thành công!")
                            navigate('/admin/book/list')
                        })
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    // Xử lí hành động ở thẻ upload ảnh
    const props = {
        onRemove: () => {
            setFile('');
        },
        beforeUpload: (file) => {
            // Clear existing fileList and add the new file
            setFile([file]);
            // Return false to prevent automatic upload
            return false;
        },
        file,
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
            <Form.Item label="Thumbnail"
                name="thumbnail"
                rules={[{ required: true, message: 'Vui lòng thêm ảnh!' }]}
            >
                <Upload {...props} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
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
