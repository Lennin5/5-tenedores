import React, { useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button} from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { size } from "lodash";
import * as firebase from "firebase";

import { reauthenticate } from "../../utils/api";

export default function ChangePasswordForm(props){
    const { setShowModal, toastRef } = props;
    const { colors } = useTheme();

    const [actualPasswordColor, setActualPasswordColor] = useState(false);
    const [newPasswordColor, setNewPasswordColor] = useState(false);
    const [repeatNewPasswordColor, setRepeatNewPasswordColor] = useState(false);

    const [hideActualPassword, setHideActualPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideRepeatNewPassword, setHideRepeatNewPassword] = useState(true);

    const [formData, setFormData] = useState(defaultValue());
    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);	

    //función que almacena los valores de los inputs y actualiza los datos de los tales
    const onChange = (e, type) => {
        // console.log(e.nativeEvent.text); Para ver los cambios de cada letra en el input
        setFormData({...formData, [type]: e.nativeEvent.text });
    }

    //función de hacer el cambio de la Password, en éste caso :)
    const onSubmit = async () => {
        //Limpiamos el serErrors
        let setUpdateErrors = true;
        let errorTemp = {};
        setErrors({});
        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorTemp = {
                password: !formData.password ? "La contraseña no puede estar vacía" : "",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacía" : "",
                repeatNewPassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacía" : ""
            }
            // && formData.password === ""
        }else if(formData.newPassword !== formData.repeatNewPassword){
            errorTemp = {
                newPassword: "Las contraseñas no son iguales",
                repeatNewPassword: "Las contraseñas no son iguales"
            }
        }else if(size(formData.newPassword) < 6){
            errorTemp = {
                newPassword: "La contraseña debe tener más de 6 caracteres",
                repeatNewPassword: "La contraseña debe tener más de 6 caracteres"
            }
        }else{
            setIsLoading(true);
            await reauthenticate(formData.password).then(async() => {
                await firebase.auth().currentUser.updatePassword(formData.newPassword).then(() =>{
                    setUpdateErrors = false;
                    setIsLoading(false);
                    setShowModal(false);
                    // firebase.auth().signOut();
                }).catch(() => {
                    errorTemp = {
                        other: "Ha habido un error al actualizar la contraseña"
                    }
                    setIsLoading(false);
                });                              
            }).catch(() => {
                errorTemp = {
                    password: "La contraseña no es correcta"
                }
                setIsLoading(false);
            })
        }
        //el && siginifica que Sí updateErrors es TRUE
        setUpdateErrors && setErrors(errorTemp);
    };

    return(
        <View style={styles.view}>
			<Input			
			onFocus={ () => {setActualPasswordColor(true), setNewPasswordColor(false), setRepeatNewPasswordColor(false)}}
			labelStyle={{ color: [ colors.theme == "dark" ? [actualPasswordColor ? "#7975DB" : "#B1B3B5"]
														  : [actualPasswordColor ? "#6848F2" : "#7D7F7D"] ] }}				
            label="Contraseña"		            
			containerStyle={styles.inputPassword}
            inputStyle={{color: colors.text}}	     
            inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}    
            //No olvidar que el "password" debe de igual que la key de la función que está allá abajo
            onChange={(e) => onChange(e, "password")}                 
            errorMessage={errors.password}
            secureTextEntry={hideActualPassword}
			leftIcon={
				<Icon 
				type="material-community"
				name='lock'
				size={30}
				color={colors.theme == "dark" ? actualPasswordColor ? "#7975DB" : "#B1B3B5" 
											  : actualPasswordColor ? "#6848F2" : "#7D7F7D" }				
				iconStyle={styles.iconsInputRegisterLeft}
				/>
              }	      
              rightIcon={
				<Icon 
					type="material-community"
					size={30}
					name={hideActualPassword ? "eye-off-outline" : "eye-outline"}
					color={colors.theme == "dark" ? hideActualPassword ? "#B1B3B5" : "#7975DB"
                                                  : hideActualPassword ? "#7D7F7D" : "#6848F2" }					
					onPress={() => setHideActualPassword(!hideActualPassword)}
				/>
			  }                        
			/>       
			<Input			
			onFocus={ () => {setActualPasswordColor(false), setNewPasswordColor(true), setRepeatNewPasswordColor(false)}}
			labelStyle={{ color: [ colors.theme == "dark" ? [newPasswordColor ? "#7975DB" : "#B1B3B5"]
														  : [newPasswordColor ? "#6848F2" : "#7D7F7D"] ] }}				
            label="Nueva Contraseña"		            
			containerStyle={styles.inputPassword}
            inputStyle={{color: colors.text}}	 
            inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}               
            onChange={(e) => onChange(e, "newPassword")}       
            errorMessage={errors.newPassword}
            secureTextEntry={hideNewPassword}
			leftIcon={
				<Icon 
				type="material-community"
				name='lock'
				size={30}
				color={colors.theme == "dark" ? newPasswordColor ? "#7975DB" : "#B1B3B5" 
											  : newPasswordColor ? "#6848F2" : "#7D7F7D" }				
				iconStyle={styles.iconsInputRegisterLeft}
				/>
              }	      
              rightIcon={
				<Icon 
					type="material-community"
					size={30}
					name={hideNewPassword ? "eye-off-outline" : "eye-outline"}
					color={colors.theme == "dark" ? hideNewPassword ? "#B1B3B5" : "#7975DB"
                                                  : hideNewPassword ? "#7D7F7D" : "#6848F2" }					
					onPress={() => setHideNewPassword(!hideNewPassword)}
				/>
			  }                        
			/>           
			<Input			
			onFocus={ () => {setActualPasswordColor(false), setNewPasswordColor(false), setRepeatNewPasswordColor(true)}}
			labelStyle={{ color: [ colors.theme == "dark" ? [repeatNewPasswordColor ? "#7975DB" : "#B1B3B5"]
														  : [repeatNewPasswordColor ? "#6848F2" : "#7D7F7D"] ] }}				
            label="Repetir Nueva Contraseña"		            
			containerStyle={styles.inputPassword}
            inputStyle={{color: colors.text}}	          
            inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}      
            onChange={(e) => onChange(e, "repeatNewPassword")}       
            errorMessage={errors.repeatNewPassword}
            secureTextEntry={hideRepeatNewPassword}
			leftIcon={
				<Icon 
				type="material-community"
				name='lock'
				size={30}
				color={colors.theme == "dark" ? repeatNewPasswordColor ? "#7975DB" : "#B1B3B5" 
											  : repeatNewPasswordColor ? "#6848F2" : "#7D7F7D" }				
				iconStyle={styles.iconsInputRegisterLeft}
				/>
              }	      
              rightIcon={
				<Icon 
					type="material-community"
					size={30}
					name={hideRepeatNewPassword ? "eye-off-outline" : "eye-outline"}
					color={colors.theme == "dark" ? hideRepeatNewPassword ? "#B1B3B5" : "#7975DB"
                                                  : hideRepeatNewPassword ? "#7D7F7D" : "#6848F2" }					
					onPress={() => setHideRepeatNewPassword(!hideRepeatNewPassword)}
				/>
			  }                        
			/>    
            <Button  
            buttonStyle={[styles.btnChangePassword, {backgroundColor: colors.primary} ]}
            title="Cambiar Contraseña"  
            titleStyle={{}}	
            onPress={onSubmit}       
            loading={isLoading}         
            />    
            <Text>{errors.other}</Text>                               
        </View>
    )
}
    function defaultValue(){
        return{
            password: "",
            newPassword: "",
            repeatNewPassword: ""
        }
    }

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },

    inputPassword: {
		width: "90%",
        marginTop: 20,        
    },    

    btnChangePassword:{
        borderRadius: 10,
        marginTop: 20,		
        width: 200,			
        height: 50,		        
    },

    iconsInputRegisterLeft:{
		marginLeft: -15,    		
    },	
});