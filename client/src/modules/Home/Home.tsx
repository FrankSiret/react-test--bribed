import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import './home.scss'

const AppHome = () => {
    return (
        <div className="app-page">
            <div className="site-layout-content">
                <h1>React Test - New Year Chaos Problem</h1>
                <p>A simple project of REST API with NodeJs, MongoDB and React.</p>
                <h2>API</h2>
                <p>You can check the API Documentation <a href="http://localhost:5000/api-docs/" rel="noreferrer" target="_blank">here</a> provided by <a href="https://swagger.io/" rel="noreferrer" target="_blank">@Swagger</a></p>
                <h2>Contact</h2>
                <p>Frank Rodríguez Siret</p>
                <ul>
                    <li>Email: frank.siret @gmail.com</li>
                    <li>Linkedin: <a href="https://www.linkedin.com/in/frank-siret" rel="noreferrer" target="_blank">Frank Rodríguez Siret</a></li>
                    <li>Website: <a href="https://franksiret.github.io/resume-cv" rel="noreferrer" target="_blank">Resume CV</a></li>
                </ul>
            </div>
        </div>
    )
}

export default AppHome;