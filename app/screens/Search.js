import React from "react";
import Toast from 'react-native-root-toast';
import { View, Text, Button } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function Search(){
const { colors } = useTheme();

	function Hello(message){
		Toast.show(message, {
			visible: false,
			duration: Toast.durations.LONG = 2500,
			position: Toast.positions.BOTTOM = -60,
			shadow: false,
			animation: true,				
			backgroundColor: colors.primary,					
		});	
}
	return(
		<View>
			<Text>Bienvenido al buscador de New_Project</Text>
			<Button title="Clock" onPress={()=>Hello('Contraseña Incorrecta')} />
		</View>
		)
}
