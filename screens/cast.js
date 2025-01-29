import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { image185 } from '../api/movieDb';

const Cast = ({cast,navigation}) => {
    const personName = 'RDJ'
    let charactername = "Tony Stark";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-4">Top Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}}>
          {
            cast && cast.map((person,index)=>{
                return (
                  <TouchableOpacity
                    key={index}
                    className="mr-4 items-center"
                    onPress={() =>
                      navigation.navigate('PersonScreen', {item:person})
                    }>
                    <View className="overflow-hidden rounded-full h-20 w-20 items-center justify-center border border-neutral-500">
                      <Image
                        source={
                          person?.profile_path
                            ? {uri: image185(person?.profile_path)}
                            : require('../components/defaultPerson.jpg')
                        }
                        className="rounded-2xl h-24 w-20"
                      />
                    </View>
                    <Text className="text-white text-xs mt-1">
                      {person?.character.length > 10
                        ? person?.character.slice(0, 10) + '...'
                        : person?.character}
                    </Text>
                    <Text className="text-neutral-400 text-xs mt-1">
                      {person?.original_name.length > 10
                        ? person?.original_name.slice(0, 10) + '...'
                        : person?.original_name}
                    </Text>
                  </TouchableOpacity>
                );
            })
          }  

      </ScrollView>
    </View>
  )
}

export default Cast