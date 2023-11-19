import { Button, Form, Image, Input, Upload } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import { changeProfile, decodeToken } from "../../api/user/auth.api"
import { useEffect, useState } from "react"
import { UploadOutlined } from "@ant-design/icons"


const ChangeInfo = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [form] = Form.useForm()
    const token = localStorage.getItem('token')
    const [user, setUser] = useState('')
    const [file, setFile] = useState([]);

    useEffect(() => {
        if (token) {
            decodeToken(token).then(res => { setUser(res.data.data); })
        }
    }, [token])

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);
    // Hàm chạy khi submit form
    const onFinish = async (values) => {
        if (file.length !== 0) {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('upload_preset', 'avatar_user'); // Replace with your Cloudinary upload preset
            formData.append('folder', 'avatar_user'); // Replace with your desired folder name

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dyewrrq39/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data.secure_url) {
                    await changeProfile(id, { ...values, avatar: data.secure_url }, token)
                        .then(() => {
                            window.alert("Cập nhật profile thành công!")
                            navigate(`/account/profile`)
                        })
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            await changeProfile(id, values, token)
                .then(() => {
                    window.alert("Cập nhật profile thành công!")
                    navigate('/account/profile')
                })
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
        <title>Cập nhật profile</title>
        <div className=' flex justify-between h-40px leading-[40px] mb-5'>
            <h1 className=' font-bold text-[25px]'>Cập nhật thông tin cá nhân</h1>
            <Link to={'/account/profile'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Back to profile <ArrowRightOutlined /></Link>
        </div>
        <Form
            form={form}
            onFinish={onFinish}
            className=" m-auto"
            labelCol={{ flex: '150px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            style={{
                maxWidth: 600,
            }}>
            <Form.Item label="Fullname"
                name="fullname"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
                <Input type="text" placeholder="Nhập họ tên của bạn" />
            </Form.Item>
            <Form.Item label="Address"
                name="address"
            >
                <Input type="text" placeholder="Nhập địa chỉ của bạn" />
            </Form.Item>
            <Form.Item label="Phone"
                name="phone"
            >
                <Input type="text" placeholder="Nhập số điện thoại của bạn" />
            </Form.Item>
            <Form.Item label="Avartar"
                name="avatar"
            >
                <Upload {...props} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Image style={{ width: '100px', marginTop: '10px' }} src={user?.avatar} />
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default ChangeInfo
