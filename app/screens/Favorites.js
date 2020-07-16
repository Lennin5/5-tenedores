import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import LoadingAM from "../components/LoadingManual";
import { useTheme } from '@react-navigation/native';

import IntroApp from "../components/IntroApp"

export default function Favorites(){	

	const { colors } = useTheme();    
	const [loadingIntroApp, setLoadingIntroApp] = useState(false);			
	return(
		<View>				
			<Text style={{color: colors.text}}>Hola</Text>
			<IntroApp isVisible={loadingIntroApp} />
		</View>
		)
}

//ESTE ES EL CUERPO DE LA APP

