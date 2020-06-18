import React, { useState, useEffect } from 'react';
import { StatusBar } from "react-native";
import { Icon, Button, Text } from 'react-native-elements';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {       

  const [darkMode, setDarkMode] = useState(true)    
  
  const LightTheme = {  
    colors: {      
      ...DefaultTheme.colors,       
      theme: "light",     
      //=====================================================================      
      primary: "#6848F2", //Color primario de la app en modo normal de la app
      secondary: "#f2f2f2", //Color secundario de la app en modo normal de la app

      background: "#ffffff", //Color del background central de la app
      text: "#000000", //Color del texto de la barra nativa de la app 
      textSecondary: "#464646", //Color del texto de la barra nativa de la app 
      card: "#ffffff", //Color del background de la parte inferior y superior de la app
      borderBottomColor: "transparent", // Color de BorderBottom del header
      border: "#B1B3B5", //BorderTop de la barra de navegación de la app
      //Otros colores del LightTheme 
      borderLightGray: "#bdbdbd73"     
      
    }
  }; 
  const DarkTheme = {  
    colors: {
      ...DefaultTheme.colors,   
      theme: "dark", 
      //=====================================================================        
      primary: '#7975DB', //Color primario de la app en modo oscuro de la app
      secondary: "#111518",//Color secundario de la app en modo oscuro de la app

      background: "#000000", //Color del background central de la app
      text: "#ffffff", //Color del texto de la barra nativa de la app 
      textSecondary: "#B1B3B5", //Color del texto de la barra nativa de la app 
      card: "#000000", //Color del background del header y navigation de la app     
      borderBottomColor: "gray", // Color de BorderBottom del header
      border: "#B1B3B5", //BorderTop de la barra de navegación de la app       
      //Otros colores del DarkTheme
      borderLightGray: "#4646469d"

    },
  };    
    return(            
        <NavigationContainer theme={darkMode ? DarkTheme : LightTheme} >               
        <StatusBar         
         backgroundColor={darkMode ? "#000000" : "#ffffff"}
         barStyle={darkMode ? "light-content" : "dark-content"} />                
            <Tab.Navigator                                                        
                initialRouteName="account"
                tabBarOptions={{ 
                  inactiveTintColor: darkMode ? "#B1B3B5" : "#9F9F9F",
                  activeTintColor: darkMode ? "#7975DB" : "#6848F2",                     
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
                />                 
                <Tab.Screen                     
                    name="account"
                    component={AccountStack} 
                    options={{ title: "Mi Cuenta" }}                    
                />                                                 
            </Tab.Navigator>                
            {/* <Button
              title={darkMode ? "Dark Mode: Enabled" : "Dark Mode: Disabled"}
              titleStyle={{color: [darkMode ? "white" : "black"]}}              
              onPress={()=>setDarkMode(!darkMode)}
              //Aquí no puse el onPress de cambio de Texto porque aún no sé cómo hacerlo xd              
              buttonStyle={{
                backgroundColor: [darkMode ? "black" : "white"],                
                borderWidth: 1,
                borderColor: [darkMode ? "white" : "black"]                                
              }}              
            />                                 */}
        </NavigationContainer>                
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