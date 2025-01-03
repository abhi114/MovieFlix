import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon,  } from 'react-native-heroicons/outline';
import {  HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios?'':'mt-15'
const MovieDetails = () => {
    const {params:item} = useRoute();
    const [isFav,toggleFav] = useState(false);
    const navigation = useNavigation();
    useEffect(()=>{
        //call the movie details api
    },[item])
  return (
    <ScrollView contentContainerStyle={{paddingBottom:35,}} className={"flex-1 bg-neutral-900 h-full "+topMargin}>
        {/* back button and movie poster */}
        <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin} style={{marginTop:ios?0:25}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className="rounded-xl p-1 justify-center items-center">
                        <ChevronLeftIcon size={26} strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>toggleFav(!isFav)}>
                        <HeartIcon size={35} color={isFav?theme.background:'white'}/>
                    </TouchableOpacity>
            </SafeAreaView>
            <View>
                <Image source={require('../components/avengers.jpg')} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.55}}/>
                <LinearGradient colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']} style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.30}}
                start={{x:0.5,y:0}}
                end={{x:0.5,y:1}}
                className="absolute bottom-0"/>
            </View>
        </View>

    </ScrollView>
  )
}

export default MovieDetails