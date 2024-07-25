// screens/FavoriteScreen.js

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../Redux/CartRedux'; // Assuming you have this action
const FavoriteScreen = () => {
  const favorites = useSelector(state => state.cart.favorites || []); // Handle initial state
  const dispatch = useDispatch();

  const handleRemoveFavorite = (item) => {
    dispatch(removeFavorite(item._id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Places</Text>
      <FlatList
        data={favorites}
       
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.ImageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.description}>Description: {item.Description}</Text>
            <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Poppins-ExtraBold',
  },
  item: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  removeButton: {
    color: 'red',
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
  },
});

export default FavoriteScreen;
