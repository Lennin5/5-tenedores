import React, { useState, useRef, useEffect } from "react";
import { StyleSheet ,View, Text } from "react-native";
import { Button, colors } from "react-native-elements";
import * as firebase from "firebase";
import Toast from "react-native-easy-toast";
import LoadingDefault from "../../components/LoadingDefault";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";
import { useTheme } from "@react-navigation/native";

export default function UserLogged(){

	const [userInfo, setUserInfo] = useState(null);
	const [loading, setloading] = useState(false);
	const [loadingText, setloadingText] = useState("");
	const [reloadUserInfo, setReloadUserInfo] = useState(false)
	const toastRef = useRef();
	const { colors } = useTheme();

	useEffect(() => {
		(async () =>{
			const user = await firebase.auth().currentUser;			
			setUserInfo(user);
			// console.log(user);			
		})();
		setReloadUserInfo(false);
	}, [reloadUserInfo]);

	return(
	<>
	<View style={styles.viewUserInfo }>

	{/* Si userInfo tiene datos te vas a renderizar	 */}
	{ userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef} /> }	
	
	<AccountOptions 
		userInfo={userInfo} 
		toastRef={toastRef}
		setReloadUserInfo={setReloadUserInfo}		
		/>

	{/* <Button
	title="Cerrar Sesión"
	titleStyle={{ color: colors.primary  }}	
	onPress={() => firebase.auth().signOut()}	
	buttonStyle={[styles.btnCloseSesion, { 
						 backgroundColor: colors.secondary, 
						 borderTopColor: colors.primary, 
						 borderBottomColor: colors.primary 
						} ]}
	/>	 */}

	<Toast ref={toastRef} position='top' opacity={0.9} fadeInDuration={800} fadeOutDuration={1000} 
	style={{backgroundColor:'#6848F2', width: "100%", borderRadius: 0, marginTop: 400, alignItems: "center"}} />		
	</View>

	<LoadingDefault isVisible={loading} text={loadingText} />
	</>
	);
}

const styles = StyleSheet.create({
	viewUserInfo: {
		minHeight: "100%",		
	},

	btnCloseSesion:{
		marginTop: 5,		
		borderTopWidth: 2,		
		borderBottomWidth: 2,		
		paddingTop: 10,
		paddingBottom: 10,		
	}
});