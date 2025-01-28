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
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles} from '../theme';
import MovieList from './MovieList';
import LoadingScreen from './LoadingScreen';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../api/movieDb';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';

const PersonScreen = () => {
  const navigation = useNavigation();
  const {params:item} = useRoute();
  const [isFav, toggleFav] = useState(false);
  const [person,setPerson] = useState({})
  const [personMovies, setPersonMovies] = useState([]);
  const [loading,setLoading]= useState(true);
 useEffect(() => {
   const fetchPersonData = async () => {
     try {
       setLoading(true);

       console.log(item);

       // Fetch person details and movies in parallel
       const [personDetails, personMovies] = await Promise.all([
         fetchPersonDetails(item.item.id),
         fetchPersonMovies(item.item.id),
       ]);

       if (personDetails) {
         console.log('Person Details Data: ' + JSON.stringify(personDetails));
         setPerson(personDetails);
       }

       if (personMovies && personMovies.cast) {
         setPersonMovies(personMovies.cast);
       }
     } catch (error) {
       console.error('Error fetching person data:', error);
     } finally {
       setLoading(false); // Ensure loading is turned off after all operations
     }
   };

   fetchPersonData();
 }, [item]);

  
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: SCREEN_HEIGHT,
          }}>
          <LoadingScreen />
        </View>
      ) : (
        <View>
          <View className="flex-row justify-center" style={imageContainerStyle}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={
                  person?.profile_path
                    ? {uri: image342(person?.profile_path)}
                    : require('../components/rdj.jpg')
                }
                style={{
                  height: SCREEN_HEIGHT * 0.43,
                  width: SCREEN_WIDTH * 0.74,
                }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-400  text-center">
              {person?.place_of_birth}
            </Text>
            <View className="flex-row p-4 justify-between items-center mx-3 mt-6 bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.gender == 1 ? 'Female' : 'Male'}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">BirthDay</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.birthday}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known For</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.known_for_department}
                </Text>
              </View>
              <View className=" px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.popularity?.toFixed(2)} %
                </Text>
              </View>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-300 tracking-wide">
              {person?.biography || 'N/A'}
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
