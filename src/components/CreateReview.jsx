import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Subheading from './Text/Subheading';

import { useHistory } from 'react-router-native';
import useCreateReview from './hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  error: {
    textAlign: 'center',
    color: theme.colors.error
  }
});

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  review: ''
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="repositoryName" placeholder="Repository's name" style={theme.input} />
      <FormikTextInput name="ownerName" placeholder="Repository owner's name" style={theme.input} />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={theme.input} multiline={true} />
      <FormikTextInput name="review" placeholder="Review" style={theme.input} />
      <Pressable style={theme.button} onPress={onSubmit}>
        <Subheading style={theme.buttonText}>Create a review</Subheading>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required("Repository's name is required"),
  ownerName: yup
    .string()
    .required("Owner's name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, review } = values;
    try {
      const data = await createReview({ repositoryName, ownerName, rating, review });
      const id = data.createReview.repositoryId;
      history.push(`/repository/${id}`);
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
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>

      <Subheading style={styles.error}>{error}</Subheading>
    </View>

  );
};

export default CreateReview;