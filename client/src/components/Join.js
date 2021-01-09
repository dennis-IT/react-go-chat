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
        header: {
            marginBottom: '1rem'
        },
        inputField: {
            minWidth: '300px'
        }
    }
    ));

    const classes = useStyle();
    const history = useHistory();

    const handleSubmit = (values, actions) => {
        history.push(`/chat?name=${values.name}&room=${values.room}`);
    };

    return (
        <div>
            <Container maxWidth='sm' className={classes.root}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography variant='h3' color='primary' className={classes.header}>Join Chat Room</Typography>
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
                                            color='primary'
                                            name='name'
                                            type='text'
                                            label='Name'
                                            fullWidth
                                            className={classes.inputField}
                                        />
                                    </Box>
                                    <Box mb={3}>
                                        <Field
                                            component={TextField}
                                            variant='outlined'
                                            color='primary'
                                            name='room'
                                            type='text'
                                            label='Room'
                                            fullWidth
                                            className={classes.inputField}
                                        />
                                    </Box>
                                    <Box>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            disabled={isSubmitting}
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
                </Box>
            </Container>
        </div>
    );
};

export default Join;
