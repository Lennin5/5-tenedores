import React from "react";
import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import { Overlay } from "react-native-elements";
import { useTheme } from "@react-navigation/native";

export default function IntroApp(props){
    const { isVisible } = props;
    const colors = useTheme();    
	return(          
			<Overlay
			isVisible={isVisible}
			windowBackgroundColor="rgba(0, 0, 0, 0.5)"
			overlayBackgroundColor="red"
            fullScreen={true}            
			overlayStyle={styles.overlay, {backgroundColor: "#726edf"}}
			>
			<View style={styles.view}>
				<Text style={{color: "white", fontSize: 15}}>Five Forks!</Text>
                <Image 
                    source={require("../../assets/img/loading.gif")}
                    style={{width: "11%", height: 37, marginTop: 10}}
                />
			</View>                          
			</Overlay>
		)
}

const styles = StyleSheet.create({

	overlay: {
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