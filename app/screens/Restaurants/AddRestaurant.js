import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native"
import Toast from "react-native-easy-toast";
import LoadingManual from "../../components/LoadingManual";
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm";


export default function AddRestaurant(props){

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();
    const { colors } = useTheme();

    return(
        <View style={{backgroundColor: colors.secondary}}>
        <AddRestaurantForm
            toastRef={toastRef}
            setIsLoading={setIsLoading}
            navigation={navigation}
        />
        

        <Toast ref={toastRef} position="bottom" opacity={0.9} fadeInDuration={800}
           fadeOutDuration={1000} positionValue={121}
		   style={{backgroundColor: colors.primary,
					 width: "100%",
					 borderRadius: 5,
					 alignItems: "center",
					 position: "absolute",
					 bottom: 10}} 
	   	/>		        
        <LoadingManual isVisible={isLoading} />
    </View>
    )
}
