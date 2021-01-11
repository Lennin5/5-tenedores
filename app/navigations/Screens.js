import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
const ScreenOne = () => {
    return(
        <View style={styles.container}>
        <Text>Test Screen 1</Text>
        </View>
    )
}

const ScreenTwo = () =>{
    return(
         <View style={styles.container}>
        <Text>Test Screen 2</Text>
        </View>
    )
}

const ScreenThree = () =>{
    return(
         <View style={styles.container}>
        <Text>Test Screen 3</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export {ScreenOne, ScreenTwo, ScreenThree}