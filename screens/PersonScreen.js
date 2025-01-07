import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles} from '../theme';
import MovieList from './MovieList';
import LoadingScreen from './LoadingScreen';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';

const PersonScreen = () => {
  const navigation = useNavigation();
  const [isFav, toggleFav] = useState(false);
  const [personMovies, setPersonMovies] = useState([1,2,3]);
  const [loading,setLoading]= useState(false);
  const imageContainerStyle = {
    ...Platform.select({
      ios: {
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
      },
      android: {
        elevation:70,
        shadowColor: '#a0a0a0',
        borderRadius: 140, // Half of container width/height for perfect circle
      },
    }),
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}>
      <SafeAreaView
        className={
          'z-20 w-full flex-row justify-between items-center px-4 ' +
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

      {/* personal details */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <View>
          <View className="flex-row justify-center" style={imageContainerStyle}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={require('../components/rdj.jpg')}
                style={{
                  height: SCREEN_HEIGHT * 0.43,
                  width: SCREEN_WIDTH * 0.74,
                }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Robert Downey Jr.
            </Text>
            <Text className="text-base text-neutral-400  text-center">
              California, USA
            </Text>
            <View className="flex-row p-4 justify-between items-center mx-3 mt-6 bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">Male</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">BirthDay</Text>
                <Text className="text-neutral-300 text-sm">1964-09-02</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known For</Text>
                <Text className="text-neutral-300 text-sm">Acting</Text>
              </View>
              <View className=" px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">23.34</Text>
              </View>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-300 tracking-wide">
              Robert John Downey Jr. (born April 4, 1965)[1] is an American
              actor. His films as a leading actor have grossed over $14 billion
              worldwide, making him one of the highest-grossing actors of all
              time. Downey's career has been characterized by some early
              success, a period of drug-related problems and run-ins with the
              law, and a surge in popular and commercial success since the late
              2000s.[2] In 2008, Downey was named by Time magazine as one of the
              100 most influential people in the world. From 2013 to 2015, he
              was listed by Forbes as Hollywood's highest-paid actor.
            </Text>
          </View>
          {/* movies */}
          <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
