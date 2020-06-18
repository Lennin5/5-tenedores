import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
import { ListItem } from "react-native-elements";
import {map } from "lodash";
import { useTheme } from "@react-navigation/native";
import Modal from "../../components/Modal";
import ChangeDisplayNameForm from "../../components/ChangeDisplayNameForm";
import ChangeEmailForm from "../../components/Account/ChangeEmailForm";

export default function AccountOptions(props){    

    const { userInfo, toastRef, setReloadUserInfo } = props;
    const { colors } = useTheme();    

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
                setRenderComponent(<Text style={{color: colors.text}}>Cambiando contraseña</Text>);
                setShowModal(true);
                break;                
            default:
                setRenderComponent(null);                
                break;
        }
    }
    const menuOptions = generateOptions(selectedComponent);
    const [showModal, setShowModal] = useState(true);
    const [renderComponent, setRenderComponent] = useState(null);

    const openModal = () => setShowModal(true);

    return(
    <View>
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
        <Button
            title="Hello"
            onPress={openModal}
        >

        </Button>
        {renderComponent &&
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
            {renderComponent}
        </Modal>        
        }
    </View>
    );
}

function generateOptions(selectedComponent){
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
            }
        ]
    )
}

const styles = StyleSheet.create({
    menuItems: {
        borderBottomWidth: 1        
    }
});