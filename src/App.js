import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useLocation} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import SnackbarContextProvider from "./contexts/SnackbarContext";
import Header from './root/Header/Header';
import Footer from './root/Footer/Footer';

import Main from './pages/Main/Main';
import Baazaar from './pages/Baazaar/Baazaar';
import GhostExplorer from './pages/GhostExplorer/GhostExplorer';
import Client from './pages/Client/Client';
import Raffle from './pages/Raffle/Raffle';
import NotFound from './pages/NotFound/NotFound';

const useStyles = makeStyles(() => ({
    wrap: {
        backgroundPosition: '0px -30vh',
        backgroundRepeat: 'no-repeat',
        flexDirection: 'column',
        minHeight: '100%',
        paddingTop: 70,
        '&.explorer': {
            height: '100%'
        }
    },
    content: {
        flexGrow: 1,
        '&.explorer': {
            height: '100%'
        }
    }
}));

export default function App() {
    const classes = useStyles();
    const location = useLocation();

    return (
        <SnackbarContextProvider>
            <Helmet>
                <title>ghst_gg</title>
            </Helmet>
            <Grid
                container
                className={classNames(classes.wrap, location.pathname === '/explorer' ? 'explorer' : '')}
            >
                <Header />
                <Grid item className={classNames(classes.content, location.pathname === '/explorer' ? 'explorer' : '')}>
                    <Switch>
                        <Route exact path={`/`} component={ Main } />
                        <Route exact path={`/market`} component={ Baazaar } />
                        <Route exact path={`/explorer`} component={ GhostExplorer } />
                        <Route exact path={`/client`} component={ Client } />
                        <Route exact path={`/raffle-calculator`} component={ Raffle } />
                        <Route exact path={`/404`} component={ NotFound } />
                        <Redirect from='*' to='/404' />
                    </Switch>
                </Grid>
                {location.pathname !== '/explorer' && <Footer />}
            </Grid>
        </SnackbarContextProvider>
    );
}
