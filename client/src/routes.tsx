import React from 'react';
import { Switch } from 'react-router-dom';
import Bribed from './entities/bribed';
import DocsPage from './modules/Docs/docs';

import AppHome from './modules/Home/Home';
import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';

const AppRoutes = () => {
  return (
    <div className="app-routes">
      <Switch>
        <ErrorBoundaryRoute path="/" exact component={AppHome} />
        <ErrorBoundaryRoute path="/bribed" component={Bribed} />
        <ErrorBoundaryRoute path="/api" component={DocsPage} />
        <ErrorBoundaryRoute component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default AppRoutes;