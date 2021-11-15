import React from 'react';
import './docs.scss';

const DocsPage = () => (
  <div className="app-page w-100">
    <div className="site-layout-content">
      <iframe
        src="http://localhost:5000/api-docs"
        width="100%"
        height="800"
        title="Swagger UI"
        seamless
        data-cy="swagger-frame"
        className="api-docs"
      />
    </div>
  </div>
);

export default DocsPage;
