import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// ADD_USER mutation functionality
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            className='mt-1 mb-1 w-100 btn-lg bg-light btn-outline-secondary text-dark rounded-pill'
            onChange={handleChange}
            value={formState.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            className='mt-1 mb-1 w-100 btn-lg bg-light btn-outline-secondary text-dark rounded-pill'
            onChange={handleChange}
            value={formState.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            className='mt-1 mb-1 w-100 btn-lg bg-light btn-outline-secondary text-dark rounded-pill'
            onChange={handleChange}
            value={formState.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(formState.username && formState.email && formState.password)}
          type='submit'
          className='btn-lg btn-warning text-dark mt-1 mb-1 rounded-pill'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
