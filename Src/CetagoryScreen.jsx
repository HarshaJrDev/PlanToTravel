import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { incrementcart } from '../Redux/CartRedux';

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const cartCounter = useSelector((state) => state.cart.length);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/NewPlaces');
      setPlaces(response.data);
    } catch (err) {
      console.error('Error fetching places:', err);
      setError('Failed to fetch places. Please try again later.');
    }
  };

  const toggleFavorite = (item) => {
    dispatch(incrementcart({ PlaceName: item.Title }));
    setFavorites((prevFavorites) =>
      prevFavorites.includes(item._id)
        ? prevFavorites.filter((favId) => favId !== item._id)
        : [...prevFavorites, item._id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.flatList}
        data={places}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsScreen', {
                  id: item._id,
                  title: item.Title,
                  description: item.Description,
                  image: item.ImageUrl,
                })
              }
            >
              <Image source={{ uri: item.ImageUrl }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.description}>Description: {item.Description}</Text>
            <Text style={styles.History}>Description: {item.History}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)} style={{display:"flex",marginLeft:240,marginTop:-40}}>
              <Icon
                name={favorites.includes(item._id) ? 'heart' : 'heart-o'}
                size={24}
                color={favorites.includes(item._id) ? 'red' : 'gray'}
              />
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
  flatList: {
    alignItems: 'center',
  },
  item: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    width: 300,
    marginHorizontal: 10,
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
  cartCounter: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginTop: 20,
  },
});

export default CategoryScreen;
