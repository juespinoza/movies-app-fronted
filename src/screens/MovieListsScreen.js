import "react-native-gesture-handler";
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useAsyncStorage } from "@react-native-community/async-storage";
import PublicListsScreen from "./PublicListsScreen";
import MyListsScreen from "./MyListsScreen";

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#fff" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };

export default function MovieListsScreen(props) {
  // console.log("es la props?", props);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Públicas" },
    { key: "second", title: "Mis listas" },
    { key: "third", title: "Siguiendo" },
  ]);
  const [user, setUser] = React.useState(null);
  const { getItem } = useAsyncStorage("@user");

  const readItemFromStorage = async () => {
    const item = await getItem();
    console.log("getItem", JSON.parse(item));
    setUser(JSON.parse(item));
  };

  React.useEffect(() => {
    readItemFromStorage();
    console.log("current value", user);
  }, [setUser]);

  const renderScene = ({ route }) => {
    console.log("pasando", user);
    switch (route.key) {
      case "first":
        return <PublicListsScreen currentUser={user} />;
      case "second":
        return <MyListsScreen currentUser={user} />;
      case "third":
        return <ThirdRoute currentUser={user} />;
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
