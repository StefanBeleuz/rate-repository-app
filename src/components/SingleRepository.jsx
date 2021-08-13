import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import useRepository from './hooks/useRepository';
import Text from './Text/Text';
import theme from '../theme';
import Subheading from './Text/Subheading';

export const reviewStyles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.colors.backgroundPrimary
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
  },
  rating: {
    textAlign: 'center',
    color: theme.colors.primary,
  },
  textContainer: {
    marginLeft: 15,
    marginRight: 25
  },
  date: {
    color: theme.colors.textTernary,
    marginBottom: 5
  }
});

const ItemSeparator = () => <View style={reviewStyles.separator} />;

const RepositoryInfo = ({ repository, openUrl }) => {
  if (!repository) return null;

  return (
    <RepositoryItem
      avatar={repository.ownerAvatarUrl}
      fullName={repository.fullName}
      description={repository.description}
      language={repository.language}
      stars={repository.stargazersCount}
      forks={repository.forksCount}
      reviews={repository.reviewCount}
      rating={repository.ratingAverage}
      open={openUrl}
    />
  );
};

const ReviewItem = ({ review }) => {
  return (
    <>
      <ItemSeparator />

      <View style={reviewStyles.container}>
        <View style={reviewStyles.ratingContainer}>
          <Subheading style={reviewStyles.rating}>{review.rating}</Subheading>
        </View>

        <View style={reviewStyles.textContainer}>
          <Subheading>{review.user.username}</Subheading>
          <Text style={reviewStyles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text>{review.text}</Text>
        </View>
      </View >
    </>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, fetchMore } = useRepository(id, { first: 5 });

  const repository = data
    ? data.repository
    : null;

  const reviews = data
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  const openInGitHub = () => {
    Linking.openURL(repository.url);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} openUrl={openInGitHub} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;