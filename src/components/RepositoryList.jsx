import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useHistory } from 'react-router-native';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import useRepositories from './hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    marginLeft: 25,
    marginRight: 25
  },
  picker: {
    height: 40,
    marginTop: 5,
    marginBottom: 5
  },
  searchBar: {
    height: 40,
    marginTop: 15
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = (item) => (
  <RepositoryItem
    avatar={item.ownerAvatarUrl}
    fullName={item.fullName}
    description={item.description}
    language={item.language}
    stars={item.stargazersCount}
    forks={item.forksCount}
    reviews={item.reviewCount}
    rating={item.ratingAverage}
  />
);

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder, filter, setFilter }) => (
  <View style={styles.header}>
    <Searchbar
      style={styles.searchBar}
      placeholder="Search by"
      onChangeText={(text) => setFilter(text)}
      value={filter}
    />

    <Picker
      style={styles.picker}
      prompt="Order By"
      selectedValue={selectedOrder}
      onValueChange={(itemValue,) => setSelectedOrder(itemValue)}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker >
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <RepositoryListHeader
        selectedOrder={this.props.selectedOrder} setSelectedOrder={this.props.setSelectedOrder}
        filter={this.props.filter} setFilter={this.props.setFilter}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item, index }) => (
          <Pressable
            key={index.toString()}
            onPress={() => this.props.openRepository(item.id)}>
            {renderItem(item)}
          </Pressable>
        )}
        kkeyExtractor={({ id }) => id}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const history = useHistory();

  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);

  const { data, fetchMore } = useRepositories(selectedOrder, debouncedFilter, { first: 8 });

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  const openRepository = (id) => {
    history.push(`/repository/${id}`);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      openRepository={openRepository}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      filter={filter}
      setFilter={setFilter}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;