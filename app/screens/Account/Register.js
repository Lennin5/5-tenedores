import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import RegisterForm from "../../components/Account/RegisterForm";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from '@react-navigation/native';

export default function Register(){		

	const toastRef = useRef();
	const { colors } = useTheme();

	return(
		<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
		<View style={styles.container}>
			<Image 
            source={colors.theme == "dark"
				? require("../../../assets/img/logoDarkMode.png")  
				: require("../../../assets/img/logoLightMode.png") } 						
			style={styles.imgLogo}
			resizeMode="contain"
			/>
		</View>	
		<View>
		<RegisterForm toastRef={toastRef} />					
		</View>	
		<Toast ref={toastRef} position='top' opacity={0.9} fadeInDuration={800} fadeOutDuration={1000} 
	   style={{backgroundColor:'#6848F2', width: "100%", borderRadius: 0, marginTop: 400, alignItems: "center"}} />		
		</KeyboardAwareScrollView>
		)
}

const styles = StyleSheet.create({
    container: {      
      alignItems: "center"
    },

    imgLogo: {
      width: "50%",
      height: 150,
      marginTop: 20,
      marginBottom: 10,
      borderRadius: 170
    },		
})