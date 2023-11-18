import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    IdcardOutlined,
    ProfileOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Loaders } from '../Loaders';
import { decodeToken } from '../../api/user/auth.api';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const CustomMenu = () => {
    const menuItems = [
        {
            key: '1',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 m-0 p-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            ,
            label: 'Thông tin sách',
            href: '/admin/book/list'
        },
        {
            key: '2',
            icon: <IdcardOutlined />,
            label: 'Danh sách tác giả',
            href: '/admin/author/list'

        },
        {
            key: '3',
            icon: <ProfileOutlined />,
            label: 'Danh mục sách',
            href: '/admin/category/list'

        },
        {
            key: '4',
            icon: <HomeOutlined />,
            label: 'Nhà xuất bản sách',
            href: '/admin/publisher/list'

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
    const navigate = useNavigate()

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
        if (!token) {
            navigate('*')
        }
        const fetchUser = async () => {
            const response = await decodeToken(token)
            setUser(response.data.data);
        }
        fetchUser()
    }, [navigate])

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
