import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
${REPOSITORY_FIELDS}
query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, 
  $first:Int, $after:String){
  repositories(orderBy:$orderBy, orderDirection:$orderDirection, searchKeyword:$searchKeyword, first:$first, after:$after) {
    edges {
      node {
        ...RepositoryFields
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;

export const GET_REPOSITORY = gql`
${REPOSITORY_FIELDS}
query GetRepository($id: ID!, $first:Int, $after:String) {
  repository(id: $id) {
    ...RepositoryFields,
    url,
    reviews(first:$first, after:$after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

export const AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repository {
            id
            fullName
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;