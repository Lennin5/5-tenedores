import React from 'react';
import { YellowBox, StatusBar } from 'react-native'
import Navigation from "./app/navigations/Navigation";
import firebaseApp from "./app/utils/firebase";

YellowBox.ignoreWarnings(["Setting a timer", "Failed prop type"]);

export default function App() {
  return(<Navigation  />)  
}

