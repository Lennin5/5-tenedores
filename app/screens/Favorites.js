import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Favorites() {
	const { colors } = useTheme();
	const [userState, setUserState] = useState(null);
	const [switchOption, setSwitchOption] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			if (userInfo) {
				setUserState(userInfo);
			} else {
				setUserState(null);
			}
		});
	}, []);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			if (userInfo) {
				firebase.firestore().collection(userInfo.uid).doc("Datos_Principales").
					onSnapshot(function (doc) {
						let user = doc.data();
						setSwitchOption(user.Modo_Oscuro);
					});
			} else {
				setSwitchOption(false);
			}

		});
	}, []);

	const toggleSwitch = () => {
		setSwitchOption(previousState => !previousState);

		if (switchOption === false) { //Si es false el switch está activo		
			setSwitchOption(true);
			console.log("Dark Mode: Enabled");
			db.collection(userState.uid).doc('Datos_Principales').update({
				Modo_Oscuro: true
			})
				.then(respose => {
					console.log("Se han actualizado el Dark Mode a: Enabled");
				}).catch(error => {
					console.log("Error al Enabled: " + error);
				});

		}
		if (switchOption === true) { //Si es true el switch NO está activo		
			setSwitchOption(false);
			console.log("Dark Mode: Disabled");
			db.collection(userState.uid).doc('Datos_Principales').update({
				Modo_Oscuro: false
			})
				.then(respose => {
					console.log("Se han actualizado el Dark Mode a: Disabled");
				}).catch(error => {
					console.log("Error al Disabled: " + error);
				});
		}
	}
	return (
		<>
		{
			userState ? 
			<View style={styles.container}>
				<Text style={{ color: colors.text }}>Modo Oscuro</Text>
				<Switch
					trackColor={{ false: "#767577", true: colors.primary }}
					thumbColor={switchOption ? "#f4f3f4" : "#f4f3f4"}					
					onValueChange={toggleSwitch}
					value={switchOption}					
				/>				
			</View>
			:
			<View>
				<Text>No Existe Usuario Activo! D:</Text>									
			</View>
		}

		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
	}
});


// import React, { useState } from "react";
// import { View, Text, Button } from "react-native";
// import LoadingAM from "../components/LoadingManual";
// import { useTheme } from '@react-navigation/native';

// // import { Buttom } from "../navigations/Navigation";

// export default function Favorites(){	

// 	const { colors } = useTheme();    
// 	const [loadingIntroApp, setLoadingIntroApp] = useState(false);			
// 	return(
// 		<View>				
// 			{/* <Buttom darkMode={darkMode} setDarkMode={setDarkMode} /> */}
// 			<Text style={{color: colors.text}}>Hola</Text>			
// 		</View>
// 		)
// }























