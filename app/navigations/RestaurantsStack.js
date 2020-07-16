import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurant";
import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function RestaurantsStack(){
    
    // console.log("RestaurantStackProps: "+props);
    const { colors } = useTheme();        

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={Restaurants}
                options={{ 
                    title: "Restaurantes",
                    headerStyle: {                                    
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderBottomColor,                                                      
                        // elevation: 3, TRES ES EL ELEVATION PREDETERMINADO DE LA SOMBRA BOTTOM DEL HEADER
                      },                
                }}
            />
            <Stack.Screen
            name="add-restaurant"
            component={AddRestaurant}
            options={{
                title: "Agregar Restaurante",
            }}
            />        
        </Stack.Navigator>
    );
}