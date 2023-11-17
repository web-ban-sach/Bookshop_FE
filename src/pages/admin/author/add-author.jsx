import { ArrowRightOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import {
    Button,
    Form,
    Input,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { addAuthor } from "../../../api/book/author.api";

const AddAuthor = () => {
    const navigate = useNavigate()

    // Hàm chạy khi submit form
    const onFinish = async (values) => {
        if (values) {
            await addAuthor(values)
                .then(() => {
                    window.alert("Thêm tác giả thành công!")
                    navigate('/admin/author/list')
                })
        }
    };

    return <>
        <div className=' flex justify-between h-40px leading-[40px] mb-5'>
            <h1 className=' font-bold text-[25px]'>Add a new author</h1>
            <Link to={'/admin/author/list'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to list <ArrowRightOutlined /></Link>
        </div>
        <Form
            onFinish={onFinish}
            className=" m-auto"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            style={{
                maxWidth: 600,
            }}>
            <Form.Item label="Tên tác giả"
                name="author_name"
                rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
            >
                <Input placeholder="Nhập tên tác giả" />
            </Form.Item>
            <Form.Item label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả về tác giả!' }]}>
                <TextArea rows={3} placeholder="Nhập mô tả về tác giả" />
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default AddAuthor
