import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { useTheme } from "@react-navigation/native";

export default function LoadingFacebook(props){
	const { isVisible } = props;
	const { colors } = useTheme();
	return(
			<Overlay
			isVisible={isVisible}
			windowBackgroundColor="rgba(0, 0, 0, 0.5)"
			fullScreen={true}
			overlayBackgroundColor="transparent"				
			overlayStyle={styles.overlay}
			>
			<View style={styles.view}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
			</Overlay>
		)
}

const styles = StyleSheet.create({

	overlay: {	
		backgroundColor: "transparent",	
		width: "100%",
		height: "70%",				
		elevation: 0,
		// borderWidth: 1,
		// borderColor: "red",		
	},

	view: {				
		flex: 1,
		alignItems: "center",
		justifyContent: "center",		
	},
	


})