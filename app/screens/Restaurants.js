import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';

export default function Restaurants(){
	const { colors } = useTheme();
	return(
		<View>
			<Text style={{color: colors.text}}>Cuerpo del restaurante</Text>
		</View>
		)
}


//ESTE ES EL CUERPO DE LA APP

