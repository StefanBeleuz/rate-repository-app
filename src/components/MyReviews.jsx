import React from 'react';
import { FlatList, Pressable, View, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';
import { useHistory } from 'react-router';

import useAuthorizedUser from './hooks/useAuthorizedUser';

import Text from './Text/Text';
import Subheading from './Text/Subheading';

import { reviewStyles } from './SingleRepository';
import theme from '../theme';
import useDeleteReview from './hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.backgroundPrimary
  },
  reviewContainer: {
    flexDirection: 'row'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  button: {
    width: 150
  }
});

const ItemSeparator = () => <View style={reviewStyles.separator} />;

const ReviewItem = ({ review, viewRepository, deleteReview }) => {
  return (
    <>
      <ItemSeparator />

      <View style={styles.container}>
        <View style={styles.reviewContainer}>
          <View style={reviewStyles.ratingContainer}>
            <Subheading style={reviewStyles.rating}>{review.rating}</Subheading>
          </View>

          <View style={reviewStyles.textContainer}>
            <Subheading>{review.repository.fullName}</Subheading>
            <Text style={reviewStyles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
            <Text>{review.text}</Text>
          </View>
        </View >

        <View style={styles.buttonsContainer}>
          <Pressable style={[theme.button, styles.button]} onPress={viewRepository}>
            <Subheading style={theme.buttonText}>View repository</Subheading>
          </Pressable>

          <Pressable style={[theme.buttonSecondary, styles.button]} onPress={deleteReview}>
            <Subheading style={theme.buttonText}>Delete review</Subheading>
          </Pressable>
        </View>
      </View>


    </>
  );
};

const MyReviews = () => {
  const history = useHistory();
  const { data, refetch } = useAuthorizedUser(true);
  const [deleteReview] = useDeleteReview();

  const reviews = data
    ? data.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];

  const viewRepository = (repositoryId) => {
    history.push(`/repository/${repositoryId}`);
  };

  const deleteReviewById = (reviewId) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete", onPress: async () => {
            try {
              const data = await deleteReview(reviewId);
              if (data.deleteReview) {
                refetch();
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      ]
    );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem
        review={item}
        viewRepository={() => viewRepository(item.repository.id)}
        deleteReview={() => deleteReviewById(item.id)} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;