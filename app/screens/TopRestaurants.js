import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RegisterForm from "../components/Account/RegisterForm"

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  <RegisterForm />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function TopRestaurants() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'FirstO', },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
	  initialLayout={initialLayout}
	  style={{backgroundColor: "#f3f"}}	  
    />
  );
}

const styles = StyleSheet.create({
  scene: {
	flex: 1,
	backgroundColor: "#f3f"
  },
  tabView: {
	  backgroundColor: "#000"
  }
});