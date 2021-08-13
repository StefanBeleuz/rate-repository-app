import { useQuery } from '@apollo/client';

import { AUTHORIZED_USER } from '../../graphql/queries';

const useAuthorizedUser = (includeReviews) => {
  const { data, loading, refetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: includeReviews }
  });

  return {
    data,
    loading,
    refetch
  };
};

export default useAuthorizedUser;