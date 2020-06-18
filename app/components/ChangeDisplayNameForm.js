import React, { useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button} from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";

export default function(props){
    const { colors } = useTheme();
    const { displayName, setShowModal, toastRef, setReloadUserInfo } = props;
    
    const [displayNameColor, setDisplayNameColor] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);	

    const onSubmit = () => {
        setError(null);
        if(newDisplayName === ""){
            setError("El nombre no puede estar vacío");
        }else 
        if(displayName === newDisplayName){
            console.log("error");
            setError("El nombre no puede ser igual al actual.");
        }else{
            setIsLoading(true);
            const update = {
                displayName: newDisplayName,
            }
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {                    
                    setIsLoading(false); 
                    setReloadUserInfo(true);
                    setShowModal(false);                                                    
                }).catch(() =>{
                    setError("Error al actualizar el nombre");
                    setIsLoading(false);
                })
        }
    }
    
    return(        
        <View style={styles.view}>        
			<Input			
			onFocus={ () => {setDisplayNameColor(true)}}
			labelStyle={{ color: [ colors.theme == "dark" ? [displayNameColor ? "#7975DB" : "#B1B3B5"]
														  : [displayNameColor ? "#6848F2" : "#7D7F7D"] ] }}				
            label="Nombre De Usuario"		            
			containerStyle={styles.input}
            inputStyle={{color: colors.text}}	
            defaultValue={displayName || ""}
            onChange={e => setNewDisplayName(e.nativeEvent.text)}
            errorMessage={error}
			leftIcon={
				<Icon 
				type="material-community"
				name='account-circle-outline'
				size={30}
				color={colors.theme == "dark" ? displayNameColor ? "#7975DB" : "#B1B3B5" 
											  : displayNameColor ? "#6848F2" : "#7D7F7D" }				
				iconStyle={styles.iconsInputRegisterLeft}
				/>
              }	              
			/>	 
        <Button  
        buttonStyle={[styles.btnChangeDisplayName, {backgroundColor: colors.primary} ]}
        title="Cambiar Nombre"  
        titleStyle={{}}	
        onPress={onSubmit}       
        loading={isLoading}         
        />       
	<Toast ref={toastRef} position='top' opacity={0.9} fadeInDuration={800} fadeOutDuration={1000} 
	style={{backgroundColor:'#6848F2', width: "100%", borderRadius: 0, marginTop: 200, alignItems: "center"}} />			             	           
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    
	input: {
		width: "90%",
        marginTop: 10,        
    },

    iconsInputRegisterLeft:{
		marginLeft: -15,    		
	},	

    btnChangeDisplayName:{
        borderRadius: 10,
        marginTop: 20,		
        width: 200,			
        height: 50,		        
    }
});