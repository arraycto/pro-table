import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@share/shareui-html';
import '@share/shareui-font';
import '@share/shareui-html/dist/patch.css';

const routes = [
    {
        key: 'index',
        path: '/',
        component: lazy(() => import('./routes/Home')),
        exact: true
    }
];

const App = () => (
    <Router>
        <Suspense fallback="loading...">
            <Switch>{routes.map(route => <Route {...route} />)}</Switch>
        </Suspense>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
