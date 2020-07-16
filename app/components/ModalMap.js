import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Overlay } from "react-native-elements";
import { useTheme } from "@react-navigation/native";

export default function Modal(props){

    const { colors } = useTheme();    
    const { isVisible, setIsVisible, children } = props;

    const closeModal = () => setIsVisible(false);    

    return(
        <Overlay        
            isVisible={isVisible}          
            windowBackgroundColor={colors.theme == "dark" ? "#75757580" : "#00000080" }
            overlayBackgroundColor={"#f8f9fb"}
            overlayStyle={styles.overlay}
            onBackdropPress={closeModal}            
        >
            {children}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: "auto",
        width: "90%",
        borderRadius: 15        
    }
});