import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props){
	const { isVisible } = props;
	return(
			<Overlay
			isVisible={isVisible}
			windowBackgroundColor="rgba(0, 0, 0, 0.5)"
			overlayBackgroundColor="red"
			fullScreen={true}
			overlayStyle={styles.overlay}
			>
			<View style={styles.view}>
				<ActivityIndicator size="large" color="#6848F2" />
			</View>
			</Overlay>
		)
}

const styles = StyleSheet.create({

	overlay: {
		backgroundColor: "transparent",		
		elevation: 0,
	},

	view: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// borderWidth: 1,
		// borderColor: "red",		
	},

})