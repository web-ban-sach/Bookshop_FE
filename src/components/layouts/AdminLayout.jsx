import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Loaders } from '../Loaders';
import { decodeToken } from '../../api/user/auth.api';
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const CustomMenu = () => {
    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
            href: '/admin/book/list'
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
            href: '/book'

        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
            href: '/book'

        },
    ]

    return <>
        <Menu theme='dark' mode="inline" defaultSelectedKeys={['1']}>
            {menuItems.map(item => (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.href}>{item.label}</Link>
                </Menu.Item>
            ))}
        </Menu>
    </>
}

const AdminLayout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay for loading
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, [loading]);

    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState('')
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchUser = async () => {
            const response = await decodeToken(token)
            setUser(response.data.data);
        }
        fetchUser()
    }, [])

    return <>
        {loading ? <Loaders /> :
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <CustomMenu />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                        className=' flex justify-between'
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className=' flex items-center justify-between px-4'>
                            {user && user.fullname ? <p className=' px-4'>Xin chào {user.fullname}</p> : <p>Xin chào admin</p>}
                            {user && user.avatar
                                ? <img className=' rounded-full w-10 h-10' src={user.avatar} alt="" />
                                : <img className=' rounded-full w-10 h-10' src="https://res.cloudinary.com/dyewrrq39/image/upload/v1700105007/bookshop/zsvvhe07vdiolrwrwpd5.png" alt="" />}
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>}
    </>

};
export default AdminLayout;
