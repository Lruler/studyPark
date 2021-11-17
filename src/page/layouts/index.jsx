import React, { useEffect, useState } from 'react'
import { Layout, Menu, Avatar, Badge } from 'antd'
import { useNavigate, useLocation } from 'react-router'
import './index.css'
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons'

const { Header, Content, Sider } = Layout

const Layouts = (props) => {
    const { count } = props
    const [isShow, setIsShow] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const handleTo = (url) => {
        switch (url) {
            case 1:
                navigate('/layout/')
                break;
            case 2:
                navigate('/layout/quiz')
                break;
            default:
                navigate('/layout/dissection/' + count)
                break;
        }
    }
    const { children } = props
    useEffect(() => {
        if (count === 4) {
           setIsShow(true)
        }
    }, [count])
    useEffect(() => {
        if (location.pathname.includes('/layout/dissection')) {
            setIsShow(false)
        }
    }, [location])
    return (
        <Layout className="lay" style={{ minHeight: '100vh' }}>
            <Sider className="sider">
                <div className="logo">乐学中心</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ padding: 0 }}
                    defaultSelectedKeys={'teach'}
                >
                    <Menu.Item key='teach' onClick={() => handleTo(1)} icon={<PieChartOutlined />} >
                        课件
                    </Menu.Item>
                    <Menu.Item key='quize' onClick={() => handleTo(2)} icon={<DesktopOutlined />}  >
                        测试
                    </Menu.Item>
                    <Menu.Item className='diss' key="diss" onClick={() => handleTo(3)} icon={<UserOutlined />}>
                        {
                            isShow  ?
                                <div className="msg">
                                    { count }
                                </div> : null
                        }
                        讨论
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Badge className='avatar'>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </Badge>
                </Header>
                <Content className='content' style={{ margin: '40px 16px' }}>{children}</Content>
            </Layout>
        </Layout>
    )
}

export default Layouts
