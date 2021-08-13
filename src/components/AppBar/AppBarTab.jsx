import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../../theme';
import Subheading from '../Text/Subheading';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textSecondary,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});

const AppBarTab = (props) => {
  if (!props.link) {
    return (
      <Pressable onPress={props.onPress}>
        <Subheading style={styles.text}>{props.children}</Subheading>
      </Pressable>
    );
  }

  return (
    <Link to={props.link}>
      <Subheading style={styles.text}>{props.children}</Subheading>
    </Link>
  );
};

export default AppBarTab;