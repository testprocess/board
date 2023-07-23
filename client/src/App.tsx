import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

import RootPage from './pages/Root'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import NotfoundPage from './pages/Notfound'
import './App.css'

const App = () => {
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />

                <Container color="palette.background.default">
                    <Switch>
                        <Route exact path="/" component={RootPage} />

                        <Route path="/auth/login" component={LoginPage} />
                        <Route path="/auth/signup" component={SignupPage} />

                        <Route path='*' component={NotfoundPage} />
                    </Switch>
                </Container>

            </ThemeProvider>


        </div>
    );
};

export default App;