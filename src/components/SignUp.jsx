import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Subheading from './Text/Subheading';

import useSignIn from './hooks/useSignIn';
import useSignUp from './hooks/useSignUp';
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
  passwordConfirm: ''
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={theme.input} />
      <FormikTextInput name="password" placeholder="Password" style={theme.input} secureTextEntry={true} />
      <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" style={theme.input} secureTextEntry={true} />
      <Pressable style={theme.button} onPress={onSubmit}>
        <Subheading style={theme.buttonText}>Sign up</Subheading>
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
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required')
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
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
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>

      <Subheading style={styles.error}>{error}</Subheading>
    </View>

  );
};

export default SignUp;