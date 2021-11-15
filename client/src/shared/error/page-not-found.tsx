import React from 'react';
import { Alert } from 'antd';

const PageNotFound = () => {
  return (
    <div className="app-page">
      <div className="site-layout-content">
        <Alert
          message="The page does not exist."
          type="error"
          showIcon
        />
      </div>
    </div >
  );
}

export default PageNotFound;
