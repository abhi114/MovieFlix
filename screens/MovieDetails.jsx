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
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios?'':'mt-15'
const MovieDetails = () => {
    const {params:item} = useRoute();
    const [isFav,toggleFav] = useState(false);
    const navigation = useNavigation();
    const [cast,setCast] = useState([1,2,3,4,5]);
    const [similarMovies,setsimilarMovies] = useState([1,2,3,4,5]);
    const [loading,setLoading]= useState(false);
    const movieName = 'Avengers:Endgame'
    useEffect(()=>{
        //call the movie details api
    },[item])
  return (
    <ScrollView contentContainerStyle={{paddingBottom:35,}} className={"flex-1 bg-neutral-900 h-full "+topMargin}>
        {/* back button and movie poster */}
        <StatusBar backgroundColor={"rgba(23,23,23,1)"} barStyle="light-content"/>
        <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin} style={{marginTop:ios?0:25}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className="rounded-xl p-1 justify-center items-center">
                        <ChevronLeftIcon size={26} strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>toggleFav(!isFav)}>
                        <HeartIcon size={35} color={isFav?theme.background:'white'}/>
                    </TouchableOpacity>
            </SafeAreaView>
            {
                loading?(
                    <LoadingScreen/>
                ):(
                <View>
                <Image source={require('../components/avengers.jpg')} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.55}}/>
                <LinearGradient colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.30}}
                start={{x:0.5,y:0}}
                end={{x:0.5,y:1}}
                className="absolute bottom-0"/>
             </View>
                )
            }
            
        </View>
        {/* movie details */}
        <View style={{marginTop:-(SCREEN_HEIGHT*0.09)}} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                     {movieName}
                </Text>
                {/* status , release data and runtime */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Released • 2020 • 170 min
                </Text>
                {/* genres */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Action •
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thrill •
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy
                    </Text>
                </View>
                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    Avengers: Endgame is a 2019 Marvel Studios film that concludes the Marvel Cinematic Universe's Infinity Saga. The movie is about the Avengers attempting to restore balance to the universe after Thanos' actions in Avengers: Infinity War. 
                </Text>
        </View>
        <Cast navigation={navigation} cast={cast}/>
        {/* similar movies */}
        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>
    </ScrollView>
  )
}

export default MovieDetails