import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Subheading from './Text/Subheading';

import useSignIn from './hooks/useSignIn';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  error: {
    textAlign: 'center',
    color: theme.colors.error
  }
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={theme.input} />
      <FormikTextInput name="password" placeholder="Password" style={theme.input} secureTextEntry={true} />
      <Pressable style={theme.button} onPress={onSubmit}>
        <Subheading style={theme.buttonText}>Sign in</Subheading>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  
  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>

      <Subheading style={styles.error}>{error}</Subheading>
    </View>
  );
};

export default SignIn;