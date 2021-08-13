import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../../theme';
import AppBarTab from './AppBarTab';

import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useHistory } from 'react-router';
import useAuthorizedUser from '../hooks/useAuthorizedUser';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundSecondary
  },
});

const AppBar = () => {
  const { data, loading } = useAuthorizedUser(false);
  const history = useHistory();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) return null;

  const authorizedUser = data.authorizedUser;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link={'/'}>Repositories</AppBarTab>
        {authorizedUser
          ?
          <>
            <AppBarTab link={'/review'}>Create a review</AppBarTab>
            <AppBarTab link={'/reviews'}>My reviews</AppBarTab>
            <AppBarTab onPress={signOut}>Sign Out</AppBarTab>
          </>
          :
          <>
            <AppBarTab link={'/signin'}>Sign In</AppBarTab>
            <AppBarTab link={'/signup'}>Sign Up</AppBarTab>
          </>
        }
      </ScrollView>
    </View >
  );
};

export default AppBar;