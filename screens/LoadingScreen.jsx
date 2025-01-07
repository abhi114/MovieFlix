import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../theme';
const LoadingScreen = () => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    
  return (
    <View style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH}} className="absolute flex-row justify-center items-center">
        <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>
    </View>
  )
}

export default LoadingScreen