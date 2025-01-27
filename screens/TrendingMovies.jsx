import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/movieDb';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.5;

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('MovieDetails', item);
  };

  const renderItem = ({ item }) => (
    <MovieCard item={item} handleClick={() => handleClick(item)} />
  );

  return (
    <View style={{ marginBottom: 5 }}>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          marginHorizontal: 16,
          marginBottom: 2,
        }}
      >
        Trending
      </Text>

      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 16} // Snap effect
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleClick}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: 16,
        marginLeft:CARD_WIDTH*0.05,
      }}
    >
      <FastImage
        source={
          item.poster_path
            ? { uri: image500(item.poster_path), priority: FastImage.priority.high }
            : require('../components/avengers.jpg')
        }
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 16,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
};

export default TrendingMovies;
