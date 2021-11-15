import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  BoldOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import './App.scss';
import 'antd/dist/antd.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import AppMenu from './shared/layout/menu/AppMenu';
import ErrorBoundary from './shared/error/error-boundary';
import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import AppRoutes from './routes';

const { Header, Content, Footer, Sider } = Layout;

const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') ?? '';

const App = () => {

  return (
    <Router basename={baseHref}>
      <Layout className="app">
        <AppMenu />
        <Content>
          <Switch>
            <Route path="/">
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </Route>
          </Switch>
          <Footer className="app-footer">
            Bribed Problem ©2021 Created by <a href="https://github.com/FrankSiret/react-test--bribed" rel="noreferrer" target="_blank">FrankSiret</a>
          </Footer>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
