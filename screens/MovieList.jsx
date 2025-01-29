import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../api/movieDb';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MovieList = ({title,data,hideSeeAll=false}) => {
    let movieName = "Avengers: Endgame";
    const navigation = useNavigation();
  return (
    <View className="mb-4 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        {!hideSeeAll && (
            <TouchableOpacity>
            <Text style={styles.text} className='text-sm'>See all</Text>
        </TouchableOpacity>
        )}
        
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:10}}>
            {
                data.map((item,index)=>{
                    return(
                        <TouchableWithoutFeedback key={index} onPress={()=>navigation.push('MovieDetails',item)}>
                            <View className="space-y-1 mr-4">
                                <Image source={item.poster_path 
                                          ? { uri: image185(item.poster_path) }
                                          : require('../components/defaultMovie.jpg')
                                        } className="rounded-3xl" style={{width:SCREEN_WIDTH*0.33,height:SCREEN_HEIGHT*0.22}}/>
                                <Text className="text-neutral-300 ml-1 text-sm">{item.title.length>14?item.title.slice(0,15)+'...':item.title}</Text>
                            </View>
                            
                        </TouchableWithoutFeedback>
                    )
                })
            }
      </ScrollView>
    </View>
  )
}

export default MovieList