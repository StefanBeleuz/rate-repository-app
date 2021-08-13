import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, review }) => {
    const { data } = await mutate({
      variables: {
        review: {
          repositoryName: repositoryName,
          ownerName: ownerName,
          rating: Number(rating),
          text: review
        }
      }
    });
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;