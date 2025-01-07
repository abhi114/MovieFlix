import { View, Text } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    
  return (
    <View>
      <Text>LoadingScreen</Text>
    </View>
  )
}

export default LoadingScreen