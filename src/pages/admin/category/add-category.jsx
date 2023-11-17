import { ArrowRightOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import {
    Button,
    Form,
    Input,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { addCategory } from "../../../api/book/category.api";

const AddCategory = () => {
    const navigate = useNavigate()

    // Hàm chạy khi submit form
    const onFinish = async (values) => {
        if (values) {
            await addCategory(values)
                .then(() => {
                    window.alert("Thêm danh mục thành công!")
                    navigate('/admin/category/list')
                })
        }
    };

    return <>
        <div className=' flex justify-between h-40px leading-[40px] mb-5'>
            <h1 className=' font-bold text-[25px]'>Add a new category</h1>
            <Link to={'/admin/category/list'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to list <ArrowRightOutlined /></Link>
        </div>
        <Form
            onFinish={onFinish}
            className=" m-auto"
            labelCol={{ flex: '120px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            style={{
                maxWidth: 600,
            }}>
            <Form.Item label="Tên danh mục"
                name="category_name"
                rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
            >
                <Input placeholder="Nhập tên danh mục" />
            </Form.Item>
            <Form.Item label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả về danh mục!' }]}>
                <TextArea rows={3} placeholder="Nhập mô tả về danh mục" />
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default AddCategory
