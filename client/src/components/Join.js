import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Container, makeStyles, Box, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const Join = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // overflow: 'hidden'
        },
        backGround: {
            border: 'solid 1px ivory',
            borderRadius: '5px',
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        header: {
            marginBottom: '1rem'
        },
        inputField: {
            //minWidth: '300px'
        }
    }
    ));

    const classes = useStyle();
    const history = useHistory();

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        history.push(`/chat?name=${values.name}&room=${values.room}`);
        actions.setSubmitting(false);
    };

    return (
        <div>
            <Container maxWidth='sm' className={classes.root}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={3} className={classes.backGround}>
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant='h3' color='secondary' className={classes.header}>Welcome to GoChat</Typography>
                    </div>

                    <div style={{ width: '100%' }}>
                        <Formik
                            initialValues={{
                                name: '',
                                room: ''
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = 'Required';
                                }
                                if (!values.room) {
                                    errors.room = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={handleSubmit}
                        >
                            {
                                ({ submitForm, isSubmitting, touched, errors }) => (
                                    <Form>
                                        <Box mb={3}>
                                            <Field
                                                component={TextField}
                                                variant='outlined'
                                                color='secondary'
                                                name='name'
                                                type='text'
                                                label='Name'
                                                className={classes.inputField}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box mb={3}>
                                            <Field
                                                component={TextField}
                                                variant='outlined'
                                                color='secondary'
                                                name='room'
                                                type='text'
                                                label='Room'
                                                className={classes.inputField}
                                                fullWidth
                                            />
                                        </Box>
                                        <Box>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                color='secondary'
                                                onClick={submitForm}
                                                disableElevation
                                            >
                                                Sign In
                                        </Button>
                                        </Box>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </Box>
            </Container>
        </div>
    );
};

export default Join;
