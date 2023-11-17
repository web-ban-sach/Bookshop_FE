import { ArrowRightOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Form,
  Input,
} from 'antd';
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { getCategoryById, updateCategory } from "../../../api/book/category.api";

const EditCategory = () => {
  const [category, setCategory] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { id } = useParams()

  // Lấy data để fill vào thẻ select danh mục, danh mục, nhà xuất bản
  useEffect(() => {
    getCategoryById(id).then((res) => {
      setCategory(res.data)
    })
  }, [id])

  useEffect(() => {
    if (category?.data) {
      form.setFieldsValue({ ...category.data });
    }
  }, [category, form]);
  // Hàm chạy khi submit form
  const onFinish = async (values) => {
    if (values) {
      await updateCategory(id, values)
        .then(() => {
          window.alert('Cập nhật danh mục thành công!')
          navigate(`/admin/category/details/${id}`)
        })
    }
  };

  return <>
    <div className=' flex justify-between h-40px leading-[40px] mb-5'>
      <h1 className=' font-bold text-[25px]'>Update category</h1>
      <Link to={`/admin/category/details/${id}`} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to details <ArrowRightOutlined /></Link>
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

export default EditCategory
