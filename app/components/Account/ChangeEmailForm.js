import React, { useState } from 'react'
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button} from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import * as firebase from "firebase";

import { validateEmail } from "../../utils/Validation";
import { reauthenticate } from "../../utils/api";


export default function ChangeEmailForm(props){
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const { colors } = useTheme();

    const [emailColor, setEmailColor] = useState(false);
    const [passwordColor, setPasswordColor] = useState(false);    
    const [hidePassword, setHidePassword] = useState(true);    

    const [formData, setFormData] = useState(defaultValue());
    const [errors, setErrors] = useState("");

    const [isLoading, setIsLoading] = useState(false);	

    //función que almacena los valores de los inputs y actualiza los datos de los tales
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});                
    }

    //función de hacer el cambio del Email, en éste caso
    const onSubmit = () => {  
        //Aquí ! significa Si !formData.email es Null y que mi barrio me respalda :v
        setErrors({});
        if(!formData.email || email === formData.email){
            setErrors({
                email: "El email no ha cambiado"
            });
        }else
        if(!validateEmail(formData.email)){
            setErrors({
                email: "Email no valido"
            });
        }else
        if(!formData.password){
            setErrors({
                password: "La contraseña no puede estar vacía"
            });
        }else{
            setIsLoading(true);
            reauthenticate(formData.password).then(resp =>{
                firebase.auth().currentUser.updateEmail(formData.email)
                .then(()=>{
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show("Se ha actualizado el Email");
                    setShowModal(false);
                }).catch(()=>{
                    setErrors({
                        email: "Error al actualizar el Email"
                    });
                    setIsLoading(false);
                });
            }).catch(() =>{
                setIsLoading(false);
                setErrors({password: "La contraseña no es correcta"});
            })
        }
    }

    return(
        <View style={styles.view}>
			<Input			
			onFocus={ () => {setEmailColor(true), setPasswordColor(false)}}
			labelStyle={{ color: [ colors.theme == "dark" ? [emailColor ? "#7975DB" : "#B1B3B5"]
                                                          : [emailColor ? "#6848F2" : "#7D7F7D"] ] }}				
            label="Correo Electrónico"		            
			containerStyle={styles.inputChangeEmail}
            inputStyle={{color: colors.text}}	
            inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}    
            defaultValue={email || ""}
            onChange={(e) => onChange(e, "email")}
            errorMessage={errors.email}
			leftIcon={
				<Icon 
				type="material-community"
				name='email'
				size={30}
				color={colors.theme == "dark" ? emailColor ? "#7975DB" : "#B1B3B5" 
                                              : emailColor ? "#6848F2" : "#7D7F7D" }			
                iconStyle={styles.iconsInputRegisterLeft}                                                     					
				/>
              }	                          
			/>	    
			<Input			
			onFocus={ () => {setPasswordColor(true), setEmailColor(false)}}
			labelStyle={{ color: [ colors.theme == "dark" ? [passwordColor ? "#7975DB" : "#B1B3B5"]
														  : [passwordColor ? "#6848F2" : "#7D7F7D"] ] }}				
            label="Contraseña"		            
			containerStyle={styles.inputPassword}
            inputStyle={{color: colors.text}}	
            inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}    
            // defaultValue={email || ""}
            onChange={(e) => onChange(e, "password")}       
            errorMessage={errors.password}
            secureTextEntry={hidePassword}
			leftIcon={
				<Icon 
				type="material-community"
				name='lock'
				size={30}
				color={colors.theme == "dark" ? passwordColor ? "#7975DB" : "#B1B3B5" 
											  : passwordColor ? "#6848F2" : "#7D7F7D" }				
				iconStyle={styles.iconsInputRegisterLeft}
				/>
              }	      
              rightIcon={
				<Icon 
					type="material-community"
					size={30}
					name={hidePassword ? "eye-off-outline" : "eye-outline"}
					color={colors.theme == "dark" ? hidePassword ? "#B1B3B5" : "#7975DB"
                                                  : hidePassword ? "#7D7F7D" : "#6848F2" }					
					onPress={() => setHidePassword(!hidePassword)}
				/>
			  }                        
			/>
        <Button  
        buttonStyle={[styles.btnChangeEmail, {backgroundColor: colors.primary} ]}
        title="Cambiar Email"  
        titleStyle={{}}	
        onPress={onSubmit}       
        loading={isLoading}         
        />                              
        </View>
    )
}

function defaultValue(){
    return{
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },

    inputChangeEmail: {
		width: "90%",
        marginTop: 10,        
    },

    inputPassword: {
		width: "90%",
        marginTop: 20,        
    },

    iconsInputRegisterLeft:{
		marginLeft: -15,    		
    },	
    
    btnChangeEmail:{
        borderRadius: 10,
        marginTop: 20,		
        width: 200,			
        height: 50,		        
    }
});