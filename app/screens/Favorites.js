import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import LoadingAM from "../components/LoadingManual";

export default function Favorites(props){	

	const [loadingAM, setloadingAM] = useState(false);	

	console.log(props);
	
	return(
		<View>			
			<Text>Cuerpo de favoritos</Text>	
			<LoadingAM isVisible={loadingAM} />
			<Button
			title="Change Theme App"				
			/>					
		</View>
		)
}

//ESTE ES EL CUERPO DE LA APP

