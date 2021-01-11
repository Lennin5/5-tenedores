import React, { useState, useEffect } from 'react';
import { StatusBar } from "react-native";
import { Icon } from 'react-native-elements';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";


import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

import IntroApp from "../components/IntroApp";

const Tab = createBottomTabNavigator();

export default function Navigation() {

  const [userState, setUserState] = useState(null);
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    (async () => {

      firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          setUserState(user);
          console.log("Existe Usuario Activo");
          await db.collection(user.uid).doc('Datos_Principales')
            .onSnapshot(function (doc) {
              if (doc.exists) {
                var user = doc.data();
                setDarkMode(user.Modo_Oscuro);
              } else {
                console.log("El documento no existe!");
                setDarkMode(false);
              }
            });
        } else {
          setDarkMode(false);
          setUserState('NoUser');          
        }

      });


    })();
  }, []);

  const LightTheme = {
    colors: {
      ...DefaultTheme.colors,
      theme: "light",
      //============================================================================ 

      primary: "#6848F2", //Color primario de la app en modo normal de la app
      secondary: "#f2f2f2", //Color secundario de la app en modo normal de la app

      background: "#f2f2f2", //Color del background central de la app
      text: "#000000", //Color del texto de la barra nativa de la app 
      textSecondary: "#464646", //Color del texto de la barra nativa de la app 
      card: "#ffffff", //Color del background de la parte inferior y superior de la app
      borderBottomColor: "transparent", // Color de BorderBottom del header
      border: "#B1B3B5", //BorderTop de la barra de navegación de la app

      //Otros colores del DarkTheme ================================================

      lightGrayColor: "#bdbdbd73", // Color GRAY LIGHT de la app en modo normal (sirve en la separación de AccountOptions)
      iconLightGrayColor: "#e3e3e3", // Color secundario de icono, es un gris más oscuro
      icon: "#7a7a7a", // Color de iconos de la app
      input: "#9e9e9e", // Color de inputs de formularios de la app
      barBackgroundColor: "#ffffff", // Background de la barra de estado
      barStyle: "dark-content", // Estilo de la barra de estado
      redColor: "#d60000", // Color rojo de la app en modo normal      
      modalMapColor: "#f8f9fb" //Color del background del Modal Map en modo normal
    }
  };
  const DarkTheme = {
    colors: {
      ...DefaultTheme.colors,
      theme: "dark",
      //============================================================================       

      primary: '#726edf', //Color primario de la app en modo oscuro de la app
      secondary: "#111518",//Color secundario de la app en modo oscuro de la app

      background: "#111518", //Color del background central de la app
      text: "#ffffff", //Color del texto de la barra nativa de la app 
      textSecondary: "#B1B3B5", //Color del texto de la barra nativa de la app 
      card: "#000000", //Color del background del header y navigation de la app     
      borderBottomColor: "gray", // Color de BorderBottom del header
      border: "#B1B3B5", //BorderTop de la barra de navegación de la app       

      //Otros colores del DarkTheme ================================================

      lightGrayColor: "#4646469d", // Color GRAY LIGHT de la app en modo oscuro (sirve en la separación de AccountOptions)
      iconLightGrayColor: "#4646469d", // Color secundario de icono, es un gris más oscuro 
      icon: "#B1B3B5", // Color de iconos de la app
      input: "#adadad", // Color de inputs de formularios de la app
      barBackgroundColor: "#000000", // Background de la barra de estado
      barStyle: "light-content", // Estilo de la barra de estado
      redColor: "#b64040", // Color rojo de la app en modo oscuro      
      modalMapColor: "#0a0a0a" //Color del background del Modal Map en modo oscuro
    },
  };

  return (
    <>
    <IntroApp />    
    <NavigationContainer theme={darkMode ? DarkTheme : LightTheme}>
      <StatusBar
        backgroundColor={darkMode ? "#000000" : "#ffffff"}
        barStyle={darkMode ? "light-content" : "dark-content"} />
      <Tab.Navigator
        initialRouteName="account"
        tabBarOptions={{
          inactiveTintColor: darkMode ? "#B1B3B5" : "#9F9F9F",
          activeTintColor: darkMode ? "#726edf" : "#6848F2",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ title: "Restaurantes" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurantsStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Mi Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}


function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline";
      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "top-restaurants":
      iconName = "star-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "account-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={25} color={color} />
  );
}

// API Google Maps: AIzaSyAqlkPP-3fCTXPuWWUkW2UVVJ9bc0L0dAQ

// Configuring credentials for lein in project 5-tenedores
// Google Certificate Fingerprint:     C4:7C:1D:90:6B:84:D6:28:9D:BB:56:0A:02:F9:64:86:9E:23:8C:16
// Google Certificate Hash SHA-1:    C47C1D906B84D6289DBB560A02F964869E238C16
// Google Certificate Hash SHA-256:  79254429D3E0ED232A9E1F1C7C8C6D3A9BA83A51D0FD35F8A2AFFF6E89329518
// Facebook Key Hash:                  xHwdkGuE1iidu1YKAvlkhp4jjBY=