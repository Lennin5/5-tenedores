// import React, { useState, useEffect } from "react";
// import { View, Switch, StyleSheet } from "react-native";

// import { firebaseApp } from "../../utils/firebase";
// import firebase from "firebase/app";
// import "firebase/firestore";
// const db = firebase.firestore(firebaseApp);

// const SwitchExample = () => {      

//   const [userState, setUserState] = useState(null);

//   const [switchOption, setSwitchOption] = useState(false);

//   useEffect(async () => {
//     await firebase.auth().onAuthStateChanged(async function(userInfo){
//       setUserState(userInfo);
//       await firebase.firestore().collection(userInfo.uid).doc("Datos_Principales").
//       onSnapshot(function(doc) {
//         if (doc.exists) {
//           var user=doc.data();                        
//           setSwitchOption(user.Modo_Oscuro);                 
//           console.log("Switch: "+switchOption);
//       } else {          
//           console.log("El documento no existe!");
//       }        
//       });               
//     });
//   }, [toggleSwitch]);    

//   const toggleSwitch = () => {        
//     setSwitchOption(previousState => !previousState);

//     if (switchOption == false) { //Si es false el switch está activo
      
//       setSwitchOption(true);
//       console.log("Dark Mode: Enabled");      
//       db.collection(userState.uid).doc('Datos_Principales').update({
//         Modo_Oscuro: true
//       })
//         .then(res => {
//           console.log("Se han actualizado el Dark Mode a: Enabled");                    
//         }).catch(err => {
//           console.log("Error al Enabled: " + err);
//         });
                
//     } else if (switchOption == true) { //Si es true el switch NO está activo
      
//       setSwitchOption(false);
//       console.log("Dark Mode: Disabled");      
//       db.collection(userState.uid).doc('Datos_Principales').update({
//         Modo_Oscuro: false
//       })
//         .then(res => {
//           console.log("Se han actualizado el Dark Mode a: Disabled");             
//         }).catch(err => {
//           console.log("Error al Disabled: " + err);
//         });              
//     }    
//   }

//   return (
//     <View style={styles.container}>
//       <Switch
//         trackColor={{ false: "#767577", true: "#81b0ff" }}
//         thumbColor={switchOption ? "#f5dd4b" : "#f4f3f4"}
//         ios_backgroundColor="#3e3e3e"
//         onValueChange={toggleSwitch}
//         value={switchOption}
//       />
//     </View>
//   );
  
// }

// export default SwitchExample;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//   }
// });







import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, StatusBar } from "react-native";
import { Icon, Avatar, Image, Input, Button, colors } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";

import Modal from "../ModalMap";
import { firebaseApp } from "../../../app/utils/firebase"; 
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const customStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
        //color predeterminado "#212121"
          "color": "#0a0a0a"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#008628"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#636363"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#00f7ff"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    }
  ]

const WidthScreen = Dimensions.get("window").width;
// console.log("No olvidar probar lo del toast WidthScreen - x valor: "+WidthScreen);

export default function AddRestaurantForm(props){    

    const { toastRef, setIsLoading, navigation } = props;
    const { colors } = useTheme();

    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAdress, setRestaurantAdress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [imagesSelected, setImagesSelected] = useState([]);
    const [locationRestaurant, setLocationRestaurant] = useState(null);

    const [isVisibleModalMap, setIsVisibleModalMap] = useState(false);
    const [reloadLocation, setReloadLocation] = useState(false);    

    const addRestaurant = () => {
        if(!restaurantName || !restaurantAdress || !restaurantDescription){
            toastRef.current.show("Todos los campos del formulario son obligatorios");
        }else
        if (size(imagesSelected) == 0) {
            toastRef.current.show("El restaurante debe tener almenos 1 foto");
        }else
        if(!locationRestaurant){
            toastRef.current.show("Tienes que localizar el restaurante en el mapa");
        }else{
            setIsLoading(true);
            console.log("mission passed");
            uploadImageStorage().then(resp => {                            
              db.collection("restaurants").add({
                name: restaurantName,
                adress: restaurantAdress,
                description: restaurantDescription,
                location: locationRestaurant,
                images: resp,
                rating: 0,
                ratingTotal: 0,
                quantityVoting: 0,
                createAt: new Date(),
                createBy: firebase.auth().currentUser.uid
              }).then(() => {
                setIsLoading(false);
                navigation.navigate("restaurants");
              }).catch(() => {
                setIsLoading(false);
                toastRef.current.show("Error al subir el restaurante, intentalo de nuevo! D:");
              })
            })
        }
    }

    const uploadImageStorage = async () => {
      const imageBlob = [];

      await Promise.all(
        map(imagesSelected, async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();
          //También pudimos hacer esto: const name = uudi(), 
          //poner NAME en el child y poner NAME en ref(name) linea 252
          const ref = firebase.storage().ref("restaurants").child(uuid());
          await ref.put(blob).then(async (resp) => {
            await firebase.storage()
                        .ref(`restaurants/${resp.metadata.name}`)
                          .getDownloadURL()
                            .then(photoURL => {
                              imageBlob.push(photoURL);
                            })

          });
        })        
      )    

      return imageBlob;
    }

    return(
        <ScrollView style={styles.scrollView}>
			<StatusBar
                backgroundColor={ [colors.theme == "dark" ? [isVisibleModalMap ? "#3a3b3d" : colors.card]
                                : [isVisibleModalMap ? "#7e7e7e" : colors.card]  ]}                                 
                barStyle={colors.barStyle}                                 
			/>		                        
            <PrincipalImageRestaurant imageRestaurant={imagesSelected[0]} imagesSelected={imagesSelected.length} />
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAdress={setRestaurantAdress}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleModalMap={setIsVisibleModalMap}
                locationRestaurant={locationRestaurant}
                setReloadLocation={setReloadLocation}
            />
            <UploadImages toastRef={toastRef} imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} />
            <Button  
            buttonStyle={[styles.btnAddRestaurant, {backgroundColor: colors.primary} ]}
            title="Crear Restaurante"              
            onPress={addRestaurant}       
            // loading={isLoading}         
            />          
            <GoogleMap isVisibleModalMap={isVisibleModalMap}
                       setIsVisibleModalMap={setIsVisibleModalMap}
                       colors={colors}
                       setLocationRestaurant={setLocationRestaurant}
                       toastRef={toastRef}
                       reloadLocation={reloadLocation}
                       setReloadLocation={setReloadLocation}
                       customStyle={customStyle}
            />         

        </ScrollView>
    )
}

//Componente de imagen principal del Restaurante (Recibe imageRestaurant[0] del arreglo de img seleccionadas)
function PrincipalImageRestaurant(props){
    const { imageRestaurant } = props;

    return( 
        <View style={styles.viewPrimaryPhoto}>
             <Image
              source={ imageRestaurant ? {uri: imageRestaurant} : require("../../../assets/img/no-image.png") }
              style={{ width: WidthScreen, height: 200 }} /> 
        </View>                                    
    )
}

//Componente de 3 inputs del formulario del AddRestaurant
function FormAdd(props){
    const { colors } = useTheme();
    const { setRestaurantName, 
            setRestaurantAdress, 
            setRestaurantDescription, 
            setIsVisibleModalMap,
            locationRestaurant,
            setReloadLocation } = props;

    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre Del Restaurante"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
                inputStyle={{color: colors.text}}
                inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}   
            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantAdress(e.nativeEvent.text)}
                inputStyle={{color: colors.text }}
                inputContainerStyle={{borderBottomWidth: 1, borderBottomColor: colors.input}}    
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant ? colors.primary : colors.icon,
                    onPress: () => setIsVisibleModalMap(true)
                }}  
            /> 
            <Input
                placeholder="Descripción"                
                multiline={true}
                inputContainerStyle={[styles.textArea, { borderBottomWidth: 1, borderBottomColor: colors.input }]}
                onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
                inputStyle={{color: colors.text}}         

            />                         
        </View>
    )
}

//Componente CargarImagenes
function UploadImages(props){

    const { colors } = useTheme();
    const { toastRef,  imagesSelected, setImagesSelected } = props;

    //el imageRestaurant puede ser diferente al nombre DE removeImage(EL nombre de la variable que se envía en la función)
    const removeImage = (image) => {        
        Alert.alert(
            "Eliminar imagen",
            "¿Seguro que quieres esta imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)                      
                        );                        
                    }
                }
            ],
            { cancelable: false }            
        );      
    }

    //Seleccionar imagen y agregar (concatenar, sumar) al estado setImagesSelected([+1, +2, etc...])
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionGallery = resultPermissions.permissions.cameraRoll.status;

        if (resultPermissionGallery === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galería");
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [5,5]
            });
            if(result.cancelled){                
                toastRef.current.show("Se ha cancelado la selección de imagenes");                
            }else{
                //lo de ...imagesSelected es para que vaya guardando o concatenando las imagenes seleccionadas
                //y así meterlas en el estado que es un arreglo [] ;)
                setImagesSelected([...imagesSelected, result.uri]);
                // console.log(imagesSelected);                
            }            
        }        

    }

    return(

    <View style={styles.UploadImages}>
        {size(imagesSelected) < 5 && (
        <Icon
            size={25}
            type="material-community"
            name="camera"
            color={colors.icon}
            containerStyle={[styles.containerIcon, { backgroundColor: colors.iconLightGrayColor, }]}
            onPress={imageSelect}
        />            
        )}

        {map(imagesSelected, (imageRestaurant, index) =>(            
            <Avatar                                
                key={index}
                style={ styles.miniImagePreview }
                source={{ uri: imageRestaurant }}
                onPress={() => removeImage(imageRestaurant)}
            />            
        ))}
    </View>
    )
}

//Componente Mapa para seleccionar la localización del Restaurante
function GoogleMap(props){
    const { isVisibleModalMap, 
            setIsVisibleModalMap, 
            toastRef, 
            colors, 
            setLocationRestaurant,
            reloadLocation,
            setReloadLocation, customStyle } = props;

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () =>{
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            );            
            const statusPermissions = resultPermissions.permissions.location.status;
            // console.log(statusPermissions);

            if(statusPermissions !== "granted"){
                toastRef.current.show("Debes de aceptar los permisos de localización para suir un restaurante.");
            }else{
              //Aquí utilizamos el Try-Catch para evitar los Warnings en la app              
              try {
                const loc = await Location.getCurrentPositionAsync({});                
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,                    
                    longitudeDelta: 0.001,
                });
              } catch (error) {
                // console.log(error);                
              }
            }
        })();
        setReloadLocation(false);
    },[reloadLocation]);

    const confirmLocation = () => {
        setLocationRestaurant(location);
        toastRef.current.show("Se ha guardado la localización.");
        setIsVisibleModalMap(false);
    }

    return(        
        <Modal isVisible={isVisibleModalMap} setIsVisible={setIsVisibleModalMap}>
            {/* <Text style={{color: colors.text}}>Que Paso Master</Text> */}
            <View>
                {location ? (
                    <>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                        customMapStyle={colors.theme == "dark" ? customStyle : []}
                    >
                    <MapView.Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    draggable
                    />
                    </MapView>
                <View style={styles.viewMapBtns}>
                    <Button 
                        title="Guardar Ubicación" 
                        containerStyle={styles.viewMapBtnContainerSave} 
                        buttonStyle={[styles.btnMapSave, {backgroundColor: colors.primary}]}
                        onPress={confirmLocation}
                    />
                    <Button 
                        title="Cancelar Ubicación" 
                        containerStyle={styles.viewMapBtnContainerCancel} 
                        buttonStyle={[styles.btnMapCancel, {backgroundColor: colors.redColor}]}
                        onPress={() => setIsVisibleModalMap(false)}
                    />
                </View> 
                </>                   
                ) : (
                    <View style={styles.noMapStyle}>
                        <Text></Text>                  
                        <Image
                            source={ colors.theme == "dark" ? require("../../../assets/img/no-location-dark.png") 
                                                            : require("../../../assets/img/no-location.png") }
                            style={styles.imgNoLocation}
                            resizeMode="contain"
                        />  
                        <Text style={{fontWeight: 'bold', color: colors.text}}>Ubicación Desactivada</Text>  
                        <Text style={{textAlign: 'center', marginBottom: 20, color: colors.text}}>Debes activar
                        la ubicación de tu dispositivo para poder agregar la localización de tu restaurante.</Text>                                                       
                    <Button 
                        title="Activar Ubicación" 
                        titleStyle={{color: colors.primary}}
                        containerStyle={styles.viewMapBtnContainerSave} 
                        buttonStyle={[styles.btnActivateLocation, {borderColor: colors.primary,}]}
                        onPress={() => setReloadLocation(true)}
                    />
                    <Button 
                        title="Cancelar Ubicación"                         
                        containerStyle={styles.viewMapBtnContainerSave} 
                        buttonStyle={[styles.btnMapCancelNoLocation, {backgroundColor: colors.redColor, borderColor: colors.redColor}]}
                        onPress={() => setIsVisibleModalMap(false)}
                    />                 
                    </View>
                )}
            </View>
        </Modal>        
    )
}

const styles = StyleSheet.create({    
    scrollView: {
        height: "100%",        
    },

    viewForm: {
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10
    },

    input: {
        marginBottom: 15,
    },

    textArea: {        
        width: "100%",
        height: 100,
        padding: 0,
        margin: 0
    },

    btnAddRestaurant:{
        borderRadius: 10,
        margin: 20,		        		
        height: 50,		        
    },    

    UploadImages: {
        flexDirection: "row",        
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },

    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 55,
        width: 55,        
        borderRadius: 10
    },

    miniImagePreview: {
        width: 55,
        height: 55,
        marginRight: 10,    
    },

    miniImagePreviewContent: {
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 10
    },

    viewPrimaryPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },

    viewMapStyle: {
        borderWidth: 1,
        borderColor: "red"
    },

    mapStyle: {                
        width: "100%",
        height: 550,      
    },

    noMapStyle: {
        width: "100%",
        height: 550,                 

        justifyContent: "center",
        alignItems: "center",

    }, 

    btnActivateLocation: {
        borderWidth: 2,                     
        backgroundColor: "transparent",        
        borderRadius: 15,
        marginBottom: 10,
        padding: 10
    },  

    btnMapCancelNoLocation: {
        borderWidth: 1,             
        padding: 10,
        borderRadius: 15,        
    },

    imgNoLocation: {
        width: "40%",                                     

        marginTop: 100,
        marginRight: 110,           
    },

    viewMapBtns: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,                
    },

    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    btnMapCancel: {        
        borderRadius: 8
    },

    viewMapBtnContainerSave: {
        paddingRight: 5
    },

    btnMapSave: {
        borderRadius: 8
    }
});







