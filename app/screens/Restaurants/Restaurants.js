import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Icon, Button } from "react-native-elements";
import { BaseNavigationContainer, useFocusEffect } from '@react-navigation/native';

import { useTheme } from '@react-navigation/native';

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

import ListRestaurants from "../Restaurants/ListRestaurants";

export default function Restaurants(props){	

	const [isVisible, setIsVisible] = useState(true);
	const { colors } = useTheme();    
	const [userState, setUserState] = useState(null);
	const { navigation } = props;		

	const [restaurants, setRestaurants] = useState([]);
	const [totalRestaurants, setTotalRestaurants] = useState(0);

	const limitRestaurants = 7;
	const [startRestaurant, setStartRestaurant] = useState(null);
	const [isLoadingNewRestaurants, setIsLoadingNewRestaurants] = useState(false);

	// console.log(restaurants);

	//UseEffect que pone los datos del usuario (esta auth es para ver si hay usuario activo y poner el btn
	// para agregar un nuevo restaurante)
    useEffect(() => {		
        firebase.auth().onAuthStateChanged((userInfo) => {
			setIsVisible(false);
			setUserState(userInfo);	
			// setStatusBarColorLoading(true)	
        });
	}, []);


	//Antes, de la linea 47 a la 61 estaba en un UseEffect. Hoy es un 
	//useFocusEffect que recoge y almacena de una manera menos tediosa el Array de todos los restaurantes
	useFocusEffect(
		useCallback(() =>{
			db.collection("restaurants").get().then((snap =>{
				setTotalRestaurants(snap.size);			
			}));
			const resutlRestaurants = [];
			db.collection("restaurants").orderBy("createAt", "desc").limit(limitRestaurants).get()
			.then((resp) => {			
				setStartRestaurant(resp.docs[resp.docs.length -1]);
				resp.forEach((doc) => {
					const restaurant = doc.data();
					restaurant.id = doc.id;
					// console.log(restaurant);
					resutlRestaurants.push(restaurant);
				});
				setRestaurants(resutlRestaurants);
			});	
		}, [])
	);	


	//Función que se ejecuta cuando el usuario llega al final del scroll de los 7 restaurantes actuales
	//lo que hace esta función es que en el UseEffect de arriba le ponemos a setStartRestaurant() 
	//el valor del útlimo restaurante -1 ya que el array inicia de 0 [de los primeros 7 restaurantes]
	//Algo así; 0, 1, 2, 3, 4, 5, 6, 7 <------ -1, sería 6
	//Mientas que setStartRestaurant() sea mayor a 0, va a seguir cargando toooodos los restaurantes hasta que
	//se acaben y setStartRestaurant() sirve para decirle a firebase:
	//tráeme los siguientes restaurantes a partir de setStartRestaurant(6) y así infinitamente
	//.Por otra parte,  concatenamos setRestaurants([...restaurants, ...resultRestaurants]); 
	//los restaurantes actuales y los nuevos a partir del anterior setStartRestaurant(6); :D
	const handleLoadMore = () => {
		const resultRestaurants = [];
		restaurants.length < totalRestaurants && setIsLoadingNewRestaurants(true);

		db.collection("restaurants")
		.orderBy("createAt", "desc")
		.startAfter(startRestaurant.data().createAt)
		.limit(limitRestaurants)
		.get()
		.then((resp) => {
			if (resp.docs.length > 0) {
				setStartRestaurant(resp.docs[resp.docs.length -1]);
			}else{
				setIsLoadingNewRestaurants(false);
			}

			resp.forEach((doc) => {				
				const restaurant = doc.data();
				restaurant.id = doc.id;
				resultRestaurants.push(restaurant);
			});
			setRestaurants([...restaurants, ...resultRestaurants]);
		});
	};
 
		
	return(
		<>	   			
        {/* <StatusBar							
			backgroundColor={isVisible ? "white" : colors.barBackgroundColor}				
			barStyle={isVisible ? "dark-content" : colors.barStyle}
			animated={true}		            			
		/>			 */}
		<View style={styles.viewBody}>			
			{/* <Text style={{color: colors.text}}>Cuerpo del restaurante</Text>			 */}
			<ListRestaurants 			
			restaurants={restaurants} 
			handleLoadMore={handleLoadMore} 
			isLoadingNewRestaurants={isLoadingNewRestaurants} />
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
		</View>
		</>
		)
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,	
		borderWidth: 0,
		borderColor: "red",		
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

