import { View, Text, Dimensions, Platform, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios?'':'my-3'
const PersonScreen = () => {
    const navigation = useNavigation()
    const [isFav,toggleFav] = useState(false);
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}>
      <SafeAreaView
        className={
          ' z-20 w-full flex-row justify-between items-center px-4 ' +
          verticalMargin
        }
        style={{marginTop: ios ? 0 : 25}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1 justify-center items-center">
          <ChevronLeftIcon size={26} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFav(!isFav)}>
          <HeartIcon size={35} color={isFav ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

export default PersonScreen