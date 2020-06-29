import "react-native-gesture-handler";
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PublicListsScreen from "./PublicListsScreen";
import MyListsScreen from "./MyListsScreen";
import FollowingListsScreen from "./FollowingListsScreen";

const initialLayout = { width: Dimensions.get("window").width };

export default function MovieListsScreen(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Públicas" },
    { key: "second", title: "Privadas" },
    { key: "third", title: "Propias" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <PublicListsScreen navigation={props.navigation} />;
      case "second":
        return <FollowingListsScreen navigation={props.navigation} />;
      case "third":
        return <MyListsScreen navigation={props.navigation} />;
      default:
        return null;
    }
  };

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
