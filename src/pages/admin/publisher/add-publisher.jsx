import { ArrowRightOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import {
    Button,
    Form,
    Input,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { addPublisher } from "../../../api/book/publisher.api";

const AddPublisher = () => {
    const navigate = useNavigate()

    // Hàm chạy khi submit form
    const onFinish = async (values) => {
        if (values) {
            await addPublisher(values)
                .then(() => {
                    window.alert("Thêm nhà xuất bản thành công!")
                    navigate('/admin/publisher/list')
                })
        }
    };

    return <>
        <div className=' flex justify-between h-40px leading-[40px] mb-5'>
            <h1 className=' font-bold text-[25px]'>Add a new publisher</h1>
            <Link to={'/admin/publisher/list'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to list <ArrowRightOutlined /></Link>
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
            <Form.Item label="Tên nhà xuất bản"
                name="publisher_name"
                rules={[{ required: true, message: 'Vui lòng nhập tên nhà xuất bản!' }]}
            >
                <Input placeholder="Nhập tên nhà xuất bản" />
            </Form.Item>
            <Form.Item label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả về nhà xuất bản!' }]}>
                <TextArea rows={3} placeholder="Nhập mô tả về nhà xuất bản" />
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default AddPublisher
