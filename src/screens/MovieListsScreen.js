import "react-native-gesture-handler";
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PublicListsScreen from "./PublicListsScreen";

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };

export default function MovieListsScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Públicas" },
    { key: "second", title: "Mis listas" },
    { key: "third", title: "Siguiendo" },
  ]);

  const renderScene = SceneMap({
    first: PublicListsScreen,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#666" }}
      style={{ backgroundColor: "#fff" }}
      labelStyle={{ color: "#666" }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
