import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from '@react-navigation/native';
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

import LoadingManual from "../../components/IntroApp";
import { Buttom } from "../../navigations/Navigation";

export default function Restaurants(props){	

	const [isVisible, setIsVisible] = useState(true);
	const { colors } = useTheme();    
	const [userState, setUserState] = useState(null);
	const { navigation } = props;				

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
			setIsVisible(false);
			setUserState(userInfo);	
			// setStatusBarColorLoading(true)	
        });
	}, []);
		
	return(
		<>	
		{/* Aquí importo la función del botón para cambiar el estado y muestra el ERROR		 */}
		<Buttom /> 	
        <StatusBar							
			backgroundColor={isVisible ? "white" : colors.barBackgroundColor}				
			barStyle={isVisible ? "dark-content" : colors.barStyle}
			animated={true}		            			
		/>			
		<View style={styles.viewBody}>			
			<Text style={{color: colors.text}}>Cuerpo del restaurante</Text>			
			{userState && (
			<Icon
				reverse
				type="material-community"
				name="plus"
				color={colors.primary}
				containerStyle={styles.btnFloatPlus}
				onPress={() => navigation.navigate("add-restaurant")}
			/>				
			)}			
			<LoadingManual isVisible={isVisible} />
		</View>
		</>
		)
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,		
	},
	btnFloatPlus: {
		position: "absolute",
		bottom: 10,
		right: 5,
		shadowColor: "#000000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.1
	}
});
//ESTE ES EL CUERPO DE LA APP

