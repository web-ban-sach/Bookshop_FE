import { Button, Form, Input } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import { changePassword } from "../../api/user/auth.api"

const ChangePassword = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const token = localStorage.getItem('token')

  // Hàm chạy khi submit form
  const onFinish = async (values) => {
    if (values) {
      await changePassword(id, values, token)
        .then(() => {
          window.alert('Đổi mật khẩu thành công!')
          navigate("/account/profile")
        }).catch(error => {
          window.alert(error?.response?.data?.message);
        })
    }
  };

  return <>
    <div className=' flex justify-between h-40px leading-[40px] mb-5'>
      <h1 className=' font-bold text-[25px]'>Thay đổi mật khẩu</h1>
      <Link to={'/account/profile'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to profile <ArrowRightOutlined /></Link>
    </div>
    <Form
      onFinish={onFinish}
      className=" m-auto"
      labelCol={{ flex: '150px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      style={{
        maxWidth: 600,
      }}>
      <Form.Item label="Mật khẩu hiện tại"
        name="currentPassword"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
      >
        <Input type="password" placeholder="Nhập tên mật khẩu hiện tại" />
      </Form.Item>
      <Form.Item label="Mật khẩu mới"
        name="newPassword"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
      >
        <Input type="password" placeholder="Nhập tên mật khẩu mới" />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  </>
}

export default ChangePassword
