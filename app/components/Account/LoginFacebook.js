import React, { useState } from "react";
import { SocialIcon, Text } from "react-native-elements";
import * as firebase from 'firebase';
import { useNavigation } from "@react-navigation/native";
import * as Facebook from 'expo-facebook';
import { FacebookApi } from "../../utils/social";
import LoadingFacebook from "../../components/LoadingFacebook";
import { useTheme } from '@react-navigation/native';

export default function LoginFacebook(props){
  
    const { toastRef } = props;
    const navigation = useNavigation();	
    
    const [loading, setLoading] = useState(false);  

    const { colors } = useTheme();
  
    const login = async () => {
      await Facebook.initializeAsync(FacebookApi.application_id);    

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: FacebookApi.permissions,      
      });
  
      if (type === "success") {    
        setLoading(!loading);       
        const credentials = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {          
            setLoading(!loading);
            navigation.navigate("account");        
          })
          .catch(() => {          
            toastRef.current.show("Credenciales incorrectas.");
            navigation.navigate("register");        
          });
      } else if (type === "cancel") {
        toastRef.current.show("Inicio de sesion cancelado");
      } else {
        toastRef.current.show("Error desconocido, intentelo más tarde");
      }
  
    };
    
    return (
      <>
      <SocialIcon
        title='Ingresar con Facebook'
        button
        type='facebook'
        style={{width: "60%"}}
        onPress={login}
      />   
      {/* <Text	
          style={{ marginTop: 20, color: colors.textSecondary }}
          >O Inicia Sesión Con</Text>	    
      <SocialIcon
        type='facebook'    
        onPress={login}
      />   */}
      <LoadingFacebook isVisible={loading} />	
 
      </>
      )    
  }