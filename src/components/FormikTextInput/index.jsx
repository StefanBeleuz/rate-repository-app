import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from '../Text/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    marginTop: 1,
  },
});

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const parseError = () => {
    if (meta.error.includes('passwordConfirm')) {
      return 'Passwords do not match!';
    }

    if (meta.error.includes('rating')) {
      return 'Rating must be a number!';
    }

    return meta.error;
  };

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={style}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{parseError(meta.error)}</Text>}
    </>
  );
};

export default FormikTextInput;