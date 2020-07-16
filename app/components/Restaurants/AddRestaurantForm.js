import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, StatusBar } from "react-native";
import { Icon, Avatar, Image, Input, Button, colors } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";

import Modal from "../ModalMap";

const WidthScreen = Dimensions.get("window").width;
// console.log("No olvidar probar lo del toast WidthScreen - x valor: "+WidthScreen);

export default function AddRestaurantForm(props){    

    const { toastRef, setIsLoading, navigation } = props;
    const { colors } = useTheme();

    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAdress, setRestaurantAdress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [imagesSelected, setImagesSelected] = useState([]);
    const [isVisibleModalMap, setIsVisibleModalMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null);

    const addRestaurant = () => {
        // console.log("Weno");
        console.log(locationRestaurant);        
    }

    return(
        <ScrollView style={styles.scrollView}>
			<StatusBar
				// backgroundColor={isVisibleModalMap ? "#7e7e7e"
                //                  : colors.card }
                                 
                backgroundColor={ [colors.theme == "dark" ? [isVisibleModalMap ? "#3a3b3d" : colors.card]
                                : [isVisibleModalMap ? "#7e7e7e" : colors.card]  ]}

				// barStyle={isVisibleModalMap ? "#fafafa" 
                //                  : colors.statusBar }
                                 
                barStyle={colors.barStyle}                                 
			/>		            
            
            <PrincipalImageRestaurant imageRestaurant={imagesSelected[0]} imagesSelected={imagesSelected.length} />
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAdress={setRestaurantAdress}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleModalMap={setIsVisibleModalMap}
            />
            <UploadImage toastRef={toastRef} imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} />
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
            />         
               
        </ScrollView>
    )
}

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

function FormAdd(props){
    const { colors } = useTheme();
    const { setRestaurantName, 
            setRestaurantAdress, 
            setRestaurantDescription, 
            setIsVisibleModalMap } = props;

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
                    color: colors.icon,
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

function UploadImage(props){

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
    
    <View style={styles.uploadImage}>
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

function GoogleMap(props){
    const { isVisibleModalMap, setIsVisibleModalMap, toastRef, colors, setLocationRestaurant } = props;

    const [location, setLocation] = useState("");

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
                const loc = await Location.getCurrentPositionAsync({});
                
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,                    
                    longitudeDelta: 0.001,
                });
            }
        })();
    }, []);

    const confirmLocation = () => {
        setLocationRestaurant(location);
        toastRef.current.show("Se ha guardado la localización.");
        setIsVisibleModalMap(false);
    }

    return(        
        <Modal isVisible={isVisibleModalMap} setIsVisible={setIsVisibleModalMap}>
            {/* <Text style={{color: colors.text}}>Que Paso Master</Text> */}
            <View>
                {Location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                    <MapView.Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        draggable
                    />                    
                    </MapView>
                )}
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

    uploadImage: {
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

