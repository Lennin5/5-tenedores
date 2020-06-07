import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import LoadingManual from "../LoadingManual";
import { useTheme } from "@react-navigation/native";

export default function InfoUser(props){ 
    
    const { colors } = useTheme();
    
    const [loading, setloading] = useState(false);
    const { 
        userInfo: { uid ,photoURL, displayName, email },
        toastRef
    } = props;    

    console.log(props.userInfo);
    
    if(displayName == null){
        // Empty Condition
    }else{
        var uidUser = uid;
        var antefirstWord = displayName.replace(/ .*/, '');
        // var antefirstWord = displayName.replace(/ /g, '');
        var firstWord =  antefirstWord.toLowerCase()+uidUser.substring(2, 5);           
    }     
    
    const changeAvatar = async () => {
        
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);        
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        console.log(resultPermission);

        if(resultPermissionCamera === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de la galería");
        }else{
            setloading(true);
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })

            if(result.cancelled){
                setloading(false);
                toastRef.current.show("Se ha cancelado la selección de imagenes");                
            }else {
                uploadImage(result.uri).then(() => {                        
                    setloading(false);
                    toastRef.current.show("Se ha actualizado la foto de perfil");   
                    updatePhotoURL();                 
                }).catch(() => {
                    console.log("Parece que ha habido un error!");                    
                });
            }
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob(); 

        const ref = firebase.storage().ref().child(`avatars/${uid}`);
        return ref.put(blob);
    }

    const updatePhotoURL = () => {
        firebase
        .storage()
        .ref(`avatars/${uid}`)
        .getDownloadURL()
        .then(async (resp) => {
            const update = {
                photoURL: resp
            };
            await firebase.auth().currentUser.updateProfile(update);  
            });                      
    };

    return(    
        <View style={[styles.viewUserInfoContainer, {backgroundColor: colors.secondary} ]}>
            <Avatar 
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoUserAvatar}
                source={photoURL
                        ? { uri: photoURL } 
                        : require("../../../assets/img/avatarDefault.jpg") 
                    } 
            />            
            {/* Si photoURL ? contiene algo / : de otra manera */}
            <View>
                <Text style={[styles.displayName, {color: colors.text}]}>
                    { displayName ? displayName : "Anónimo"}
                </Text>
                <Text style={{color: colors.text}}>
                { email ? email : `${firstWord}@expo.com`}
                </Text>
            </View>
            <LoadingManual isVisible={loading} />
        </View>            
    );
}

const styles = StyleSheet.create({
    viewUserInfoContainer:{        
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,            
        elevation: 0,
    },

    userInfoUserAvatar: {
        marginRight: 20
    },

    displayName:{
        fontWeight: "bold",
        paddingBottom: 10,
        fontSize: 20
    }

});