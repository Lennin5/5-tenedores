import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <View style={styles.viewContainer}>
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#6848F2" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },

  overlay: {
    height: 100,
    width: "50%",
    backgroundColor: "white",    
    borderWidth: 2,
    borderColor: "#6848F2",
    borderRadius: 15
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,    
  },
  text: {    
    textTransform: "uppercase",
    marginTop: 10,        
    color: "#6848F2",
  },
});