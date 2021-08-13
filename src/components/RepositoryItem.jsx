import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

import theme from '../theme';
import Subheading from './Text/Subheading';

const dataStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 25,
    marginRight: 35,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  description: {
    color: theme.colors.textTernary,
    marginTop: 5,
    marginBottom: 5,
  },
  language: {
    padding: 5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    borderRadius: 5,
    alignSelf: 'flex-start'
  }
});

const RepoItemData = ({ avatar, fullName, description, language }) => (
  <View style={dataStyles.container}>
    <Image
      style={dataStyles.avatar}
      source={{ uri: avatar }} />

    <View style={dataStyles.textContainer}>
      <Subheading>{fullName}</Subheading>
      <Text style={dataStyles.description}>{description}</Text>
      <Text style={dataStyles.language}>{language}</Text>
    </View>
  </View >
);

const statsStyles = StyleSheet.create({
  container: { marginTop: 25 },
  row: { flexDirection: 'row' },
  cell: { flex: 1 },
});

const RepoItemStats = ({ stars, forks, reviews, rating }) => {
  const kFormatter = (num) =>
    num > 999
      ? (Math.abs(num) / 1000).toFixed(1) + 'k'
      : num;

  return (
    <View style={statsStyles.container}>
      <View style={statsStyles.row}>
        <Subheading style={statsStyles.cell}>{kFormatter(stars)}</Subheading>
        <Subheading style={statsStyles.cell}>{kFormatter(forks)}</Subheading>
        <Subheading style={statsStyles.cell}>{kFormatter(reviews)}</Subheading>
        <Subheading style={statsStyles.cell}>{kFormatter(rating)}</Subheading>
      </View>
      <View style={statsStyles.row}>
        <Text style={[statsStyles.cell, { color: 'gray' }]}>Stars</Text>
        <Text style={[statsStyles.cell, { color: 'gray' }]}>Forks</Text>
        <Text style={[statsStyles.cell, { color: 'gray' }]}>Reviews</Text>
        <Text style={[statsStyles.cell, { color: 'gray' }]}>Rating</Text>
      </View>

    </View >
  );
};

const itemStyles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.backgroundPrimary
  },
});

const RepositoryItem = ({ avatar, fullName, description, language, stars, forks, reviews, rating, open }) => (
  <View style={itemStyles.container}>
    <RepoItemData
      avatar={avatar}
      fullName={fullName}
      description={description}
      language={language}
    />
    <RepoItemStats
      stars={stars}
      forks={forks}
      reviews={reviews}
      rating={rating}
    />
    {open
      ?
      <Pressable style={theme.button} onPress={open}>
        <Subheading style={theme.buttonText}>Open in GitHub</Subheading>
      </Pressable>
      : null}
  </View>
);

export default RepositoryItem;