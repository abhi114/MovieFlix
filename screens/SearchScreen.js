import { View, Text, Dimensions, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import {debounce} from 'lodash'
import { image185, searchMovies } from '../api/movieDb';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    let movieName = "Avengers: Endgame";
    const [loading,setLoading]= useState(false);
    const handleSearch = value =>{
      if(value && value.length > 2){
        setLoading(true);
        searchMovies({
          query:value,
          include_adult:'true',
          language: 'en-US',
          page:'1'
      }).then(data=>{
        setLoading(false);
        //console.log(data);
        if(data && data.results) {
          setResults(data.results);
        }
      })
      }else{
        setLoading(false);
        setResults([])
      }
    };
    const handleTextDebounce = useCallback(debounce(handleSearch,400),[]);
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full mt-5">
                <TextInput 
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie' 
                    placeholderTextColor={'lightgray'} 
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                   
                />
                <TouchableOpacity onPress={()=>{navigation.goBack();}} className="rounded-full p-2 m-1 bg-neutral-500">
                    <XMarkIcon size={25} color={'white'} />
                  </TouchableOpacity>
        
            </View>
            {/* results */}
            {loading?(
              <LoadingScreen/>
            ): (
              results.length>0 ? (
                     <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}}
            className="space-y-3">
                <Text className='text-white font-semibold ml-1'>Results ({results.length})</Text>
                <View className="flex-row justify-between flex-wrap">
                  {results.map((item,index)=>{
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('MovieDetails', item)}>
                        <View className="space-y-2 mb-4">
                          <Image
                            className="rounded-3xl"
                            source={
                              item?.poster_path
                                ? {uri: image185(item?.poster_path)}
                                : require('../components/defaultMovie.jpg')
                            }
                            style={{
                              width: SCREEN_WIDTH * 0.44,
                              height: SCREEN_HEIGHT * 0.3,
                            }}
                          />
                          <Text className="text-neutral-300 ml-1">
                            {item?.title.length > 20
                              ? item?.title.slice(0, 20) + '...'
                              : item?.title}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
            </ScrollView>
            ):(
                <View className="flex-row justify-center">
                    <Image source={require("../components/movieTime4.png")} className="h-80 w-80" style={{resizeMode:'contain'}}/>
                </View>
            )
            )}
            
           
            </SafeAreaView>
  );
}

export default SearchScreen