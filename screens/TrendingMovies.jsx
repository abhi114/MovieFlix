import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/movieDb';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate responsive dimensions
const CARD_WIDTH = SCREEN_WIDTH * 0.7;  // 70% of screen width
const CARD_HEIGHT = SCREEN_HEIGHT * 0.5; // 40% of screen height

const TrendingMovies = ({ data }) => {
    const navigation = useNavigation();
  const carouselRef = useRef(null);
    const handleClick = (item)=>{
        navigation.navigate('MovieDetails',item);
    }
  return (
    
      <View style={{ marginBottom: 5 }}>
        <Text 
          style={{ 
            color: 'white',
            fontSize: 18,
            marginHorizontal: 16,
            marginBottom: 2
          }}
        >
          Trending
        </Text>

        <Carousel
          ref={carouselRef}
          loop={true}
          autoPlay={true}
          autoPlayInterval={5000}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          data={data}
          panGestureHandlerProps={{
          activeOffsetX: [-10, 10], // Helps control swipe sensitivity
        }}
          scrollAnimationDuration={1000}
          //onSnapToItem={(index) => console.log('Current index:', index)}
          renderItem={({ item }) => <MovieCard item={item} handleClick={()=>handleClick(item)}/>}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 40,
          }}
          style={{
            width: SCREEN_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    
  );
};

const MovieCard = ({ item ,handleClick}) => {
  // Handle image loading error with a backup image
  console.log("poster path" + item.poster_path)
  const onImageError = (error) => {
    console.log('Image loading error:', error);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleClick}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        padding: 8,
      }}
    >
      <Image
        source={item.poster_path 
          ? { uri: image500(item.poster_path) }
          : require('../components/avengers.jpg')
        }
        onError={onImageError}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 16,
          resizeMode: 'cover',
        }}
      />
    </TouchableOpacity>
  );
};

export default TrendingMovies;