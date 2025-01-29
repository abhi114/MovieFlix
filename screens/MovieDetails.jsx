import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon,  } from 'react-native-heroicons/outline';
import {  HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from './cast';
import MovieList from './MovieList';
import LoadingScreen from './LoadingScreen';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/movieDb';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios?'':'mt-15'
const MovieDetails = () => {
    const {params:item} = useRoute();
    const [isFav,toggleFav] = useState(false);
    const navigation = useNavigation();
    const [cast,setCast] = useState([]);
    const [similarMovies,setsimilarMovies] = useState([]);
    const [loading,setLoading]= useState(true);
    const [movie,setMovie] = useState({});
    const movieName = 'Avengers:Endgame'
   useEffect(() => {
  // Start loading
  setLoading(true);

  // Fetch all data
  const fetchData = async () => {
    try {
      const [movieDetails, movieCredits, similarMoviesData] = await Promise.all([
        fetchMovieDetails(item.id),
        fetchMovieCredits(item.id),
        fetchSimilarMovies(item.id),
      ]);

      // Set data once all are fetched
      if (movieDetails) {
        setMovie(movieDetails);
      }

      if (movieCredits && movieCredits.cast) {
        setCast(movieCredits.cast);
      }

      if (similarMoviesData && similarMoviesData.results) {
        setsimilarMovies(similarMoviesData.results);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      // Stop loading after everything is done
      setLoading(false);
    }
  };

  fetchData();
}, [item]);

    const getSimilarMovies = async (id)=>{
        const data =await fetchSimilarMovies(id);
        if(data && data.results) {
            setsimilarMovies(data.results);
        }
    }
    const getMovieCredits = async id=> {
        const data = await fetchMovieCredits(id);
        if(data&& data.cast) {
            setCast(data.cast)
        }
        setLoading(false);
    }
    const getMovieDetails = async id=>{
        const data = await fetchMovieDetails(id)
        //console.log(data);
        if(data){
            setMovie(data);
            //console.log("poster path is" + movie.poster_path)
        }
        
    }
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 35 }} className={"flex-1 bg-neutral-900 h-full " + topMargin}>
    <StatusBar backgroundColor={"rgba(23,23,23,1)"} barStyle="light-content" />
    
    {/* Show the loader while fetching data */}
    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT }}>
        <LoadingScreen />
      </View>
    ) : (
      <>
        {/* Back button and movie poster */}
        <View className="w-full">
          <SafeAreaView
            className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}
            style={{ marginTop: ios ? 0 : 25 }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1 justify-center items-center">
              <ChevronLeftIcon size={26} strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFav(!isFav)}>
              <HeartIcon size={35} color={isFav ? theme.background : 'white'} />
            </TouchableOpacity>
          </SafeAreaView>
          <View>
            <Image
              source={
                movie?.poster_path
                  ? { uri: image500(movie?.poster_path) }
                  : require('../components/defaultMovie.jpg')
              }
              style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.68 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.30 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        </View>

        {/* Movie details */}
        <View style={{ marginTop: -(SCREEN_HEIGHT * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movie?.title}
          </Text>
          {movie?.id && (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie?.release_date.split('-')[0]} • {movie?.runtime} min
            </Text>
          )}
          <View className="flex-row justify-center mx-4 space-x-2">
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length;
              return (
                index <= 3 && (
                  <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                    {genre?.name} {showDot ? '•' : null}
                  </Text>
                )
              );
            })}
          </View>
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
        </View>

        {/* Cast and Similar Movies */}
        <Cast navigation={navigation} cast={cast} />
        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
      </>
    )}
  </ScrollView>
  )
}

export default MovieDetails