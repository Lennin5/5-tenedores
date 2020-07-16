import React, { useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import RegisterForm from "../../components/Account/RegisterForm";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from '@react-navigation/native';

export default function Register(){		

	const toastRef = useRef();
	const { colors } = useTheme();

	return(
		<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
		<Text></Text>			
		</View>	
		<Toast ref={toastRef} position="bottom" opacity={0.9} fadeInDuration={800} fadeOutDuration={1000} positionValue={121}
		   style={{backgroundColor: colors.primary,
					 width: "100%",
					 borderRadius: 0,
					 alignItems: "center",
					 position: "absolute",
					 bottom: 10}} 
	   	/>		
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