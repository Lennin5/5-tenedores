import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../screens/Favorites";
import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function FavoritesStack(){    
    const { colors } = useTheme();        

    return(
        <Stack.Navigator>            
            <Stack.Screen                          
                name="favorites"
                component={Favorites}
                options={{ 
                    title: "Favoritos",                    
                    headerStyle: {                                    
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderBottomColor                              
                        // elevation: 3, TRES ES EL ELEVATION PREDETERMINADO DE LA SOMBRA BOTTOM DEL HEADER
                      },
                }}                
            />
        </Stack.Navigator>
    );
}