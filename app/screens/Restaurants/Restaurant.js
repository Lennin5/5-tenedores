import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Restaurant(props) {    
    console.log(props);
    const { colors } = useTheme();     
    
    return (
        <View>
            <Text>Restaurante INFO</Text>
        </View>
    )
}

const styles = StyleSheet.create({

});
    
