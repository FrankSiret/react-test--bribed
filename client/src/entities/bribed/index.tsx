import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import Bribed from './bribed';
import BribedUpdate from './bribed-update';
import BribedDetail from './bribed-detail';
import BribedDeleteDialog from './bribed-delete-dialog';

const Routes: (props: any) => JSX.Element = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BribedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BribedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BribedDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bribed} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BribedDeleteDialog} />
  </>
);

export default Routes;
