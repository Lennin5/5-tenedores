import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import LoadingAM from "../components/LoadingManual";

export default function Favorites(){	

	const [loadingAM, setloadingAM] = useState(false);			
	return(
		<View>				
			<Text></Text>	
			<LoadingAM isVisible={loadingAM} />
			<Button
			title="Change Theme App"				
			/>						
		</View>
		)
}

//ESTE ES EL CUERPO DE LA APP

