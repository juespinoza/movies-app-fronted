import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuDrawerStructure from "./MenuDrawerStructure";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createStackNavigator();

export default homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Peliculas", //Set Header Title
          headerLeft: () => (
            <MenuDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#5360ed", //Set Header color
          },
          headerTintColor: "#000", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "Movie Details", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
