import React, { useState } from 'react'
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button} from "react-native-elements";
import { useTheme } from "@react-navigation/native";

export default function ChangeEmailForm(props){
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const { colors } = useTheme();

    const [emailColor, setEmailColor] = useState(false);
    const [passwordColor, setPasswordColor] = useState(false)

    const [formData, setFormData] = useState(defaultValue())

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});        
    }

    const onSubmit = () => {
        console.log("Email Clicked ME!");
        console.log(formData);
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
            defaultValue={email || ""}
            onChange={(e) => onChange(e, "email")}
            // errorMessage={error}
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
            // defaultValue={email || ""}
            onChange={(e) => onChange(e, "password")}       
            // errorMessage={error}
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
			/>
        <Button  
        buttonStyle={[styles.btnChangeEmail, {backgroundColor: colors.primary} ]}
        title="Cambiar Email"  
        titleStyle={{}}	
        onPress={onSubmit}       
        // loading={isLoading}         
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