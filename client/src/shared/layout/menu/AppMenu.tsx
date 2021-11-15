import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    BoldOutlined,
    ApiOutlined,
} from '@ant-design/icons';

import './appMenu.scss'

const { Header } = Layout;

const logo = '/logo192.png';

const AppMenu = () => {

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const location = useLocation();

    useEffect(() => {
        const l = location.pathname.split('/');
        if (location.pathname === '' || location.pathname === '/')
            setSelectedKeys(['home']);
        else if (l.length > 1 && l[1] === 'bribed') setSelectedKeys(['bribed']);
        else if (l.length > 1 && l[1] === 'api') setSelectedKeys(['api']);
    }, [location.pathname]);

    return (
        <Header className="app-header">
            <div className="logo">
                <img src={logo} alt="React logo" />
            </div>
            <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys} >
                <Menu.Item key='home' icon={<HomeOutlined />} >
                    <NavLink to="/">
                        Home
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='bribed' icon={<BoldOutlined />}>
                    <NavLink to="/bribed">
                        Bribed
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='api' icon={<ApiOutlined />}>
                    <NavLink to="/api">
                        API
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default AppMenu;