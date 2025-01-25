import { View, Text, Platform, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingMovies from './TrendingMovies';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MovieList from './MovieList';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import { fetchTrendingMovies } from '../api/movieDb';
const ios = Platform.OS === 'ios';
const HomeScreen = () => {
  const [trending,settrending]= useState([]);
  const [upcoming,setupcoming]= useState([1,2,3]);
  const [topRated,settopRated]= useState([1,2,3]);
  const [loading,setLoading]= useState(true);
  const navigation = useNavigation();

  useEffect(()=>{
    //getTrendingMovies();
    //console.log("hi")
  },[])
  const getTrendingMovies = async()=>{
    //console.log("hit here")
    const data = await fetchTrendingMovies();
    console.log('got trending Movies' + JSON.stringify(data));
    if(data && data.results){
      settrending(data.results);

    }
    setLoading(false);
  }
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios?"-mb-2":'mb-3'}>
        <StatusBar barStyle={'light-content'} />
        <View className="flex-row justify-between items-center mx-4 my-2">
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"white"}/>
        <Text className="text-white text-2xl font-bold">
            <Text style={styles.text}>M</Text>ovies<Text style={styles.text}>F</Text>lex
            </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("SearchScreen")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"}/>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading? (
        <LoadingScreen/>
      ):
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}> 
          {trending.length>0 && <TrendingMovies data={trending}/>}
          <MovieList title="Upcoming" data={upcoming}/>
          <MovieList title="Top Rated" data={topRated}/>
      </ScrollView>}
      
    </View>
  )
}

export default HomeScreen