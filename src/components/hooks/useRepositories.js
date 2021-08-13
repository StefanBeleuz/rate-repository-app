import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../../graphql/queries';

const useRepositories = (order, searchKeyword, { first }) => {
  const orderBy = order !== 'latest' ? 'RATING_AVERAGE' : 'CREATED_AT';
  const orderDirection = order === 'lowestRated' ? 'ASC' : 'DESC';

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
      first
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        orderBy,
        orderDirection,
        searchKeyword,
        first,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return {
    data,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;