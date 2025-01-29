import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/movieDb';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7; // Card width is 70% of screen width
const CARD_HEIGHT = SCREEN_HEIGHT * 0.5; // Card height is 50% of screen height
const SPACING = 16; // Space between cards
const SIDE_VISIBLE_CARD_WIDTH = (SCREEN_WIDTH - CARD_WIDTH) / 2 - (SPACING*3) ; // Visible part of the side cards

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('MovieDetails', item);
  };

  const renderItem = ({ item, index }) => (
    <MovieCard
      key={index}
      item={item}
      handleClick={() => handleClick(item)}
    />
  );

  return (
    <View style={{ marginBottom: 5 }}>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          marginHorizontal: 16,
          marginBottom: 5,
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
        snapToAlignment="center" // Align the center card to the center of the screen
        
        decelerationRate="fast"
        pagingEnabled={false} // Allows free scrolling
        initialScrollIndex={1} // Start with the second item centered
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + SPACING,
          offset: (CARD_WIDTH + SPACING) * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: SIDE_VISIBLE_CARD_WIDTH , // Add padding for visible side cards
          alignItems: 'center',
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
        marginRight: SPACING, // Space between cards
      }}
    >
      <FastImage
        source={
          item.poster_path
            ? { uri: image500(item.poster_path), priority: FastImage.priority.high }
            : require('../components/defaultMovie.jpg')
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
