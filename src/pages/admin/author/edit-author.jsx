import { ArrowRightOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Form,
  Input,
} from 'antd';
import { useEffect, useState } from "react";
import { getAuthorById, updateAuthor } from "../../../api/book/author.api";
import TextArea from "antd/es/input/TextArea";

const EditAuthor = () => {
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { id } = useParams()

  // Lấy data để fill vào thẻ select danh mục, tác giả, nhà xuất bản
  useEffect(() => {
    getAuthorById(id).then((res) => {
      setAuthor(res.data)
    })
  }, [id])

  useEffect(() => {
    if (author?.data) {
      form.setFieldsValue({ ...author.data });
    }
  }, [author, form]);
  // Hàm chạy khi submit form
  const onFinish = async (values) => {
    if (values) {
      await updateAuthor(id, values)
        .then(() => {
          window.alert('Cập nhật tác giả thành công!')
          navigate(`/admin/author/details/${id}`)
        }
        )
    }
  };

  return <>
    <div className=' flex justify-between h-40px leading-[40px] mb-5'>
      <h1 className=' font-bold text-[25px]'>Update author</h1>
      <Link to={`/admin/author/details/${id}`} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to details <ArrowRightOutlined /></Link>
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

export default EditAuthor
