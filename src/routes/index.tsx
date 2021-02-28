import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import { Container } from './styles';
import Login from '../pages/Login/index';
import Users from '../pages/Users/index';
import CreateUsers from '../pages/CreateUsers/index';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/users" component={Users} />
      <Route path="/create" component={CreateUsers} />
    </Switch>
  );
};

export default Routes;
