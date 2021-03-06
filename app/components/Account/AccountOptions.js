import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
import { ListItem } from "react-native-elements";
import {map } from "lodash";
import { useTheme } from "@react-navigation/native";
import Modal from "../../components/Modal";
import ChangeDisplayNameForm from "../../components/Account/ChangeDisplayNameForm";
import ChangeEmailForm from "../../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../../components/Account/ChangePasswordForm";

import LoadingManual from "../../components/LoadingManual";

import * as firebase from "firebase";

export default function AccountOptions(props){    

    const { userInfo, toastRef, setReloadUserInfo } = props;
    const { colors } = useTheme();    
    const [isVisible, setIsVisible] = useState(false);

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                 <ChangeDisplayNameForm 
                    displayName={userInfo.displayName}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}
                    />
                );
                setShowModal(true);
                break;
            case "email": 
                setRenderComponent(
                    <ChangeEmailForm
                    email={userInfo.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}                    
                    />
                );
                setShowModal(true);
                break;
            case "password": 
            setRenderComponent(
                    <ChangePasswordForm                    
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    />        
                );        
                setShowModal(true);
                break;                
            default:
                setRenderComponent(null);                
                break;
        }
    }

    const menuOptions = generateOptions(selectedComponent, firebase, setIsVisible);
    const [showModal, setShowModal] = useState(true);
    const [renderComponent, setRenderComponent] = useState(null);

    const openModal = () => setShowModal(true);

    return(
    <View> 
        <LoadingManual isVisible={isVisible} /> 
        {map(menuOptions, (menu, index) => (            
            <ListItem
                titleStyle={{color: colors.textSecondary}}
                containerStyle={[ styles.menuItems ,{backgroundColor: colors.secondary, borderBottomColor: colors.borderLightGray}]}
                leftIcon={{
                    type: menu.iconType,
                    name: menu.iconNameLeft,
                    color: colors.textSecondary
                }}
                rightIcon={{
                    type: menu.iconType,
                    name: menu.iconNameRight,
                    color: colors.textSecondary
                }}
                key={index}
                title={menu.title}
                onPress={menu.onPress}                
             />
        ) )}
        
        {renderComponent &&
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
            {renderComponent}
        </Modal>        
        }
    </View>
    );
}

function generateOptions(selectedComponent, firebase, setIsVisible){
    const logOut = () => {
        setIsVisible(true);        
        firebase.auth().signOut();
    }    
    return(
        [
            {
                title: "Cambiar Nombre y Apellido",
                iconType: "material-community",
                iconNameLeft: "account-circle",
                iconNameRight: "chevron-right",   
                onPress: () => selectedComponent("displayName")

            },
            {
                title: "Cambiar Correo Electrónico",
                iconType: "material-community",
                iconNameLeft: "at",
                iconNameRight: "chevron-right",
                onPress: () => selectedComponent("email")   
            },
            {
                title: "Cambiar Contraseña",
                iconType: "material-community",
                iconNameLeft: "lock-reset",
                iconNameRight: "chevron-right",
                onPress: () => selectedComponent("password")                
            },
            {
                title: "Cerrar Sesión",
                iconType: "material-community",
                iconNameLeft: "logout",
                iconNameRight: "chevron-right",
                onPress:() => logOut()
            },            
        ]
    )
}

const styles = StyleSheet.create({
    menuItems: {
        borderBottomWidth: 1        
    },
    container: {
                
      },
});