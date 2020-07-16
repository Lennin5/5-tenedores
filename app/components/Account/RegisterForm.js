import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput  } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from 'firebase';
import LoadingDefault from '../LoadingDefault';
import { useNavigation, useTheme } from "@react-navigation/native";

export default function RegisterForm(props){

    const { toastRef } = props;
	const navigation = useNavigation();	
	const { colors } = useTheme();

	const [EmailColor, setEmailColor] = useState(false);
	const [PasswordColor, setPasswordColor] = useState(false);
	const [PasswordRepeatColor, setPasswordRepeatColor] = useState(false);

	const [hidePassword, setHidePassword] = useState(true);
	const [hideRepeatPassword, sethideRepeatPassword] = useState(true);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
    const [loadingDefault, setLoadingDefault] = useState(false);
    const [loadingCreatedAccount, setLoadingCreatedAccount] = useState(false);

	// function EyeView(){
	// 	if (hidePassword==true) {
	// 		console.log('esta no visible');
	// 	} else 
	// 	if (hidePassword==false) {
	// 		console.log('esta visible');		
	// 	}
	// }

	const register = async () => {		
		// signo ! significa Si email esta NUll o vacio ; == igual, !== diferente de
		if(!email || !password || !repeatPassword){
			toastRef.current.show("Todos los campos son necesarios");
		} else {
		  if(!validateEmail(email)){		  
		  	toastRef.current.show("Email no valido");
			} else {
				if(password !== repeatPassword){					
					toastRef.current.show("Las contraseñas no coinciden");
				} else {
                    setLoadingDefault(true);
					await firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(() => {			
                    firebase.auth().signOut();
                    setLoadingCreatedAccount(true);
                    setLoadingDefault(false);
                    toastRef.current.show("Cuenta creada exitosamente!");
                    navigation.navigate("login");			
                    setLoadingCreatedAccount(false);		
					}).catch(() => {						
						toastRef.current.show("Ha habido un error al crear la cuenta");
					});
				}
			}
		}	
	};


	return(

// MINI PREVIEW DEL MODO OSCURO		
///* <View style={[styles.formContainer, {backgroundColor: [hideRepeatPassword ? "aqua" : "red"]} ]} >	 */
<View style={styles.formContainer}>		
			<Input			
			onFocus={ () => {setEmailColor(true), setPasswordColor(false), setPasswordRepeatColor(false)} }
			labelStyle={{ color: [ colors.theme == "dark" ? [EmailColor ? "#7975DB" : "#B1B3B5"]
														  : [EmailColor ? "#6848F2" : "#7D7F7D"] ] }}				
			label="Correo Electrónico"		
			containerStyle={styles.inputForm}
			inputStyle={{color: colors.text}}
			inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}
			onChange={e => setEmail(e.nativeEvent.text)}
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
			onFocus={ () => {setEmailColor(false), setPasswordColor(true), setPasswordRepeatColor(false)} }
			labelStyle={{ color: [ colors.theme == "dark" ? [PasswordColor ? "#7975DB" : "#B1B3B5"]
														  : [PasswordColor ? "#6848F2" : "#7D7F7D"] ] }}							
			label="Contraseña"
			password={true}
			secureTextEntry={hidePassword}
			containerStyle={styles.inputForm}
			inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}
			inputStyle={{color: colors.text}}
			onChange={e => setPassword(e.nativeEvent.text)}
			rightIcon={
				<Icon 
					type="material-community"
					size={30}
					name={hidePassword ? "eye-off-outline" : "eye-outline"}
					color={colors.theme == "dark" ? hidePassword ? "#B1B3B5" : "#7975DB"
												  : hidePassword ? "#7D7F7D" : "#6848F2" }										
					onPress={() => setHidePassword(!hidePassword)} 
					//Se puede utlizar otra funcion separada por , antes:
						// onPress={EyeView(), () => setHidePassword(!hidePassword)}
				/>
			  }	
			  leftIcon={
				<Icon 
				type="material-community"
				name='lock'
				size={30}
				color={colors.theme == "dark" ? PasswordColor ? "#7975DB" : "#B1B3B5"
											  : PasswordColor ? "#6848F2" : "#7D7F7D" }				
				iconStyle={styles.iconsInputRegisterLeft}
				/>
			  }				  
			/>
			<Input 
			onFocus={ () => {setEmailColor(false), setPasswordColor(false), setPasswordRepeatColor(true)} }
			labelStyle={{ color: [ colors.theme == "dark" ? [PasswordRepeatColor ? "#7975DB" : "#B1B3B5"]
														  : [PasswordRepeatColor ? "#6848F2" : "#7D7F7D"] ] }}								
			label="Repetir contraseña"
			password={true}
			secureTextEntry={hideRepeatPassword}
			containerStyle={styles.inputForm}
			inputStyle={{color: colors.text}}
			inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}
			onChange={e => setRepeatPassword(e.nativeEvent.text)}
			rightIcon={
				<Icon 
					type="material-community"
					size={30}
					name={hideRepeatPassword ? "eye-off-outline" : "eye-outline"}
					color={colors.theme == "dark" ? hideRepeatPassword ? "#B1B3B5" : "#7975DB"
												  : hideRepeatPassword ? "#7D7F7D" : "#6848F2" }					
					onPress={() => sethideRepeatPassword(!hideRepeatPassword)}
				/>
			  }
			  leftIcon={
				<Icon 
				type="material-community"
				name='lock'
				size={30}
				color={colors.theme == "dark" ? PasswordRepeatColor ? "#7975DB" : "#B1B3B5"
											  : PasswordRepeatColor ? "#6848F2" : "#7D7F7D" }				
				iconStyle={styles.iconsInputRegisterLeft}
				/>
			  }					  	
			/>			
        <Button  
        buttonStyle={[styles.btnRegister, {backgroundColor: colors.primary} ]}
        title="REGISTRARME"  
        titleStyle={{ marginRight: 35 }}	
        onPress={register}
        />			
        <LoadingDefault isVisible={loadingDefault} text="Creando Cuenta" />        
</View>
    );
};

const styles = StyleSheet.create({	
	formContainer: {                		
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
				
    	marginRight: 20,
    	marginLeft: 20		
	},

	inputForm: {
		width: "100%",
        marginTop: 15,        
	},

	btnRegister: {	
		backgroundColor: "#6848F2",	
		borderRadius: 30,
		marginTop: 20,
		width: "75%",			
        height: 50,				        
	},

	iconsInputRegisterLeft:{
		marginLeft: -15,    
		
	},	
})