import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

import { useTheme } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AccountStack(){
    const { colors } = useTheme();
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                options={{               
                    title: "Cuenta",                    
                    headerStyle: {                        
                        // elevation: 3, TRES ES EL ELEVATION PREDETERMINADO DE LA SOMBRA BOTTOM DEL HEADER
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderBottomColor  
                      },
                  }}    
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: "Iniciar sesión",
                    headerStyle: {                                                
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderBottomColor  
                    },
                 }}                
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: "Registro",
                    headerStyle: {                                        
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderBottomColor  
                    },
                 }}
            />            
        </Stack.Navigator>
    );
}