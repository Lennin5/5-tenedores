import React, {useState } from "react";
import {
  View,
  Dimensions,
  Animated
} from "react-native";
import {createAppContainer} from 'react-navigation'
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs'
// import {Ionicons}from '@expo/vector-icons'
import {ScreenOne, ScreenTwo, ScreenThree} from '../navigations/Screens'

const App = () => {
  const AppContainer = createAppContainer(bottomNavigator)
  return(
    <AppContainer />
  )
}

const CustomBottomBar = (props) =>{
  //We use the spread operator to pass down all default properties of a bottom bar

  //custom styles for our indicator
  //The width of the indicator should be of equal size with each tab button. We have 3 tab buttons therefore, the width of a single tab button would be the total width Dimension of the screen divided by 3

  const {width} = Dimensions.get('screen')

  //Create an animated value 
  const [position] = useState(new Animated.ValueXY())

  //We attach the x,y coordinates of the position to the transform property of the indicator so we can freely animate it to any position of our choice.
  const animStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom:0,
      width: width/3,
      backgroundColor: 'blue',
      transform: position.getTranslateTransform()
  }

  const animate = (value, route) =>{
      //navigate to the selected route on click
      props.navigation.navigate(route)

      //animate indicator
      Animated.timing(position, {
          toValue: {x: value, y: 0},
          duration: 300,
          useNativeDriver: true
      }).start()
  }

  return(
      <View>
      <Animated.View style={animStyles} />
      <BottomTabBar {...props} onTabPress={({route}) =>{
          switch(route.key){
              case 'Home':
              //animated position should be 0
                   animate(0, route.key)
                   break
                   case 'Notifications':
                   //animated position is width/3
                    animate(width/3 , route.key)
                    break
                    case 'Profile':
                    //animated position is width of screen minus width of single tab button
                     animate(width - (width/3), route.key)
                     break
          }
      }} style={{backgroundColor: 'transparent'}} />
      </View>
  )
}


const config= {
  tabBarOptions:{
  activeTintColor: '#fff',
  inactiveTintColor: 'rgba(0,0,0,0.7)'
},
tabBarComponent: (props) => <CustomBottomBar {...props} />
}

const bottomNavigator = createBottomTabNavigator({
  Home:{
    screen: ScreenOne,
    navigationOptions:{
      // tabBarIcon: ({tintColor}) => <Ionicons name='md-home' color={tintColor} size={24} />
    }
  },
  Notifications:{
    screen: ScreenTwo,
    navigationOptions:{
      // tabBarIcon: ({tintColor}) => <Ionicons name='md-notifications' color={tintColor} size={24} />
    }
  },
  Profile:{
    screen: ScreenThree,
    navigationOptions:{
      // tabBarIcon: ({tintColor}) => <Ionicons name='md-person' color={tintColor} size={24} />
    }
  }
}, config)

export default App;