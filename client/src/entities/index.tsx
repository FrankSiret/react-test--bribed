import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from '../shared/error/error-boundary-route';

import Bribed from './bribed';
import PageNotFound from '../shared/error/page-not-found';

const Routes = ({ match }: { match: any }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}bribed`} component={Bribed} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
