import React, { useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image, Dimensions  } from "react-native";
import { Button, Input, Icon, SocialIcon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import Toast from "react-native-easy-toast";
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginFacebook from "../../components/Account/LoginFacebook";
import { useNavigation, useTheme } from "@react-navigation/native";

const HeightScreen2 = Dimensions.get("window").height;
const HeightScreen = HeightScreen2 - 340;
// console.log(HeightScreen);

export default function Login(){	

	const toastRef = useRef();	
	const navigation = useNavigation();			

	const [EmailColor, setEmailColor] = useState(false);
	const [PasswordColor, setPasswordColor] = useState(false);	

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");	

	const { colors } = useTheme();
	// console.log(colors);
	
	
	// const getParams = async () => {		
	// 	() => navigation.getParams(name, "Josué");		
	// }	
	

	const login = async () => {		
		// signo ! significa Si email esta NUll o vacio ; == igual, !== diferente de
		if(!email || !password){
			toastRef.current.show("Todos los campos son necesarios");
		} else {
		  if(!validateEmail(email)){		  
		  	toastRef.current.show("Email no valido");
			} else {				
						await firebase.auth().signInWithEmailAndPassword(email, password)
						 .then(res=>{
							navigation.navigate("account");	
							console.log("Existe Usuario Activo");	
						 })
						 .catch(function(error) {
							 var errorCode = error.code;
							 var errorMessage = error.message;
							 console.log("erroCode: "+errorCode);
							 console.log("errorMessage: "+errorMessage);
							 //Aquí aplicaría los errores de contraseña incorrecta, el usuario no existe, etc.
						 });					
			}
		}	
	};	
		
	

	return(
<KeyboardAwareScrollView enableOnAndroid={false}>

<View style={styles.viewInputsForm}>		
{/* <Text>
	
</Text> */}
	<Input
	labelStyle={{ color: [ colors.theme == "dark" ? [EmailColor ? "#7975DB" : "#B1B3B5"]
												  : [EmailColor ? "#6848F2" : "#7D7F7D"] ] }}
	label="Correo Electrónico"		
	onFocus={ () => {setEmailColor(true), setPasswordColor(false)} }	
	onChange={e => setEmail(e.nativeEvent.text)}	
	containerStyle={styles.inptForm}
	inputStyle={{color: colors.text}}
	inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}
	leftIcon={
		<Icon
		type="material-community"
		name='email'
		size={30}
		color={colors.theme == "dark" ? EmailColor ? "#7975DB" : "#B1B3B5" 
									  : EmailColor ? "#6848F2" : "#7D7F7D" }
		iconStyle={styles.iconsInputRegisterLeft}
		/>
	}
	/>
	<Input
	labelStyle={{ color: [ colors.theme == "dark" ? [PasswordColor ? "#7975DB" : "#B1B3B5"]
												  : [PasswordColor ? "#6848F2" : "#7D7F7D"] ] }}
		label="Contraseña"	
		secureTextEntry={true}	
		onFocus={ () => {setEmailColor(false), setPasswordColor(true)} }	
		onChange={e => setPassword(e.nativeEvent.text)}	
		containerStyle={styles.inptForm}
		inputStyle={{color: colors.text}}
		inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}
		leftIcon={
			<Icon
			type="material-community"		
			color={colors.theme == "dark" ? PasswordColor ? "#7975DB" : "#B1B3B5"
										  : PasswordColor ? "#6848F2" : "#7D7F7D" }
			name='lock'
			size={30}		
			iconStyle={styles.iconsInputRegisterLeft}
			/>
		}
		/>	
</View>

<View style={styles.viewBtnsNextToLogin}>
	<Button  
		buttonStyle={[styles.btnLogin, {backgroundColor: colors.primary} ]}
		title="INICIAR SESIÓN"  
		titleStyle={{ marginRight: 40 }}		
		onPress={login}		
		/>	
		<Text	
		style={{ marginTop: 5, color: colors.textSecondary }}
		>Olvidaste tu contraseña?</Text>

<View style={styles.viewLoginWithfacebook}>
	<LoginFacebook toastRef={toastRef} />
</View>

	<Text		
		style={{ marginTop: 40, color: colors.textSecondary }}
		>No tienes una cuenta?</Text>	
	<Button  
		buttonStyle={[styles.btnRegister, {borderColor: colors.primary} ]}
		title="REGISTRARME"  
		titleStyle={{ color: colors.primary , marginRight: 40}}		
		onPress={() => navigation.navigate("register")}
		/>	
</View>
			
<Toast ref={toastRef} position="bottom" opacity={0.9} fadeInDuration={800} fadeOutDuration={1000} positionValue={120}
		   style={{backgroundColor: colors.primary,
					 width: "100%",
					 borderRadius: 0,
					 alignItems: "center",
					 position: "absolute",
					 bottom: 10}} 
	   	/>

</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	viewBtnsNextToLogin:{
		marginTop: 10,
		// backgroundColor: "gray",		
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"		
	},

	viewInputsForm: {	
		marginTop: 35,				
		marginRight: 20,
		marginLeft: 20,				
	},

	btnLogin: {			
		borderRadius: 30,
		marginTop: 20,
		width: "75%",			
		height: 50,				
	},

	viewLoginWithfacebook:{
		marginTop: 40,
		// borderWidth: 2, 
		// borderColor: "#6848F2",
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		marginRight: 140,
		width: "100%"
	},

	btnRegister: {
		backgroundColor: "transparent",	
		borderWidth: 2, 
		// borderColor: "#6848F2",
		borderRadius: 30,
		marginTop: 5,
		width: "75%",			
		height: 50,			
		marginBottom: 40
	},

	inptForm: {
		width: "100%",
		marginTop: 20,		
	},
	
	iconsInputRegisterLeft: {
		marginLeft: -15,    
	}
});