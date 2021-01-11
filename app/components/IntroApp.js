import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image, StatusBar } from "react-native";
import { Overlay } from "react-native-elements";
import { useTheme } from "@react-navigation/native";


import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function IntroApp() {

	const colors = useTheme();
	
	const [statusBarColor, setStatusBarColor] = useState(null);
	const [dataLoadedState, setDataLoadedState] = useState(null);

	useEffect(() => {
		(async () => {
			await firebase.auth().onAuthStateChanged(async function (user) {
				if (user) {
					console.log("Existe Usuario Activo");
					await db.collection(user.uid).doc('Datos_Principales')
						.onSnapshot(function (doc) {
							if (doc.exists) {
								var data = doc.data();							
								setTimeout(() => {
									setDataLoadedState(data.Datos_Cargados);
									setStatusBarColor(data.Modo_Oscuro);
								}, 1);
							} else {
								console.log("El documento no existe!");
								setDataLoadedState(true);
							}
						});

				}else{					
					console.log("No Existe Usuario Activo");
					setDataLoadedState(true);
				}
			}
			);
		})();		
	}, []);


	return (
		<>
			<StatusBar
				backgroundColor={statusBarColor ? colors.theme == "dark" ? "#fff" : "#000" : "#fff"}
				barStyle={statusBarColor ? colors.theme == "dark" ? "dark-content" : "light-content" : "dark-content"} />
			<Overlay
			/* // Traemos de la BD el valor del campo "Datos_Cargados", se lo ponemos al dataLoadedState		
				// Si los datos NO han cargado, isVisible del IntroApp = true (Va a estar cargando) y,
				// Si los datos SI han cargado, isVisible del IntroApp = false (se esconde) */		
				isVisible={dataLoadedState ? false : true}
				// windowBackgroundColor="rgba(0, 0, 0, 0.5)"		
				// overlayBackgroundColor="red"
				fullScreen={true}
				overlayStyle={styles.overlay, { backgroundColor: "#726edf" }}
			>
				<View style={styles.view}>
					<Text style={{ color: "white", fontSize: 15 }}>Five Forks!</Text>
					<Image
						source={require("../../assets/img/loading.gif")}
						style={{ width: "11%", height: 37, marginTop: 10 }}
					/>
				</View>
			</Overlay>
		</>
	)
}

const styles = StyleSheet.create({
	overlay: {
		elevation: 0,
	},

	view: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// borderWidth: 1,
		// borderColor: "red",		
		zIndex: 1
	},

})