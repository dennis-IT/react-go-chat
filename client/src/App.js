import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, Paper } from '@material-ui/core';

import './App.css';
import Join from './components/Join';
import Chat from './components/Chat';

const App = () => {
    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                '"Roboto Condensed"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(',')
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Paper style={{ minHeight: '100vh' }}>
                <BrowserRouter>
                    <Route path='/' exact component={Join}></Route>
                    <Route path='/chat' component={Chat}></Route>
                </BrowserRouter>
            </Paper>
        </ThemeProvider>
    );
};

export default App;