import { ArrowRightOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Form,
  Input,
} from 'antd';
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { getPublisherById, updatePublisher } from "../../../api/book/publisher.api";

const EditPublisher = () => {
  const [publisher, setPublisher] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { id } = useParams()

  // Lấy data để fill vào thẻ select danh mục, nhà xuất bản, nhà xuất bản
  useEffect(() => {
    getPublisherById(id).then((res) => {
      setPublisher(res.data)
    })
  }, [id])

  useEffect(() => {
    if (publisher?.data) {
      form.setFieldsValue({ ...publisher.data });
    }
  }, [publisher, form]);
  // Hàm chạy khi submit form
  const onFinish = async (values) => {
    if (values) {
      await updatePublisher(id, values)
        .then(() => {
          window.alert('Cập nhật nhà xuất bản thành công!')
          navigate(`/admin/publisher/details/${id}`)
        }
        )
    }
  };

  return <>
    <div className=' flex justify-between h-40px leading-[40px] mb-5'>
      <h1 className=' font-bold text-[25px]'>Update publisher</h1>
      <Link to={`/admin/publisher/details/${id}`} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to details <ArrowRightOutlined /></Link>
    </div>
    <Form
      form={form}
      onFinish={onFinish}
      className=" m-auto"
      labelCol={{ flex: '110px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      style={{
        maxWidth: 600,
      }}>
      <Form.Item label="Nhà xuất bản"
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

export default EditPublisher
