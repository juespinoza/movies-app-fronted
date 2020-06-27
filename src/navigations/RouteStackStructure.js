import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuDrawerStructure from "./MenuDrawerStructure";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export const homeScreen = ({ navigation }) => {
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
            backgroundColor: "#cfcba7", //Set Header color
          },
          headerTintColor: "#333", //Set Header text color
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
          headerLeft: () => navigation.navigate("Home"),
        }}
      />
    </Stack.Navigator>
  );
};

export const registerScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Registrarse", //Set Header Title
          headerLeft: () => (
            <MenuDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#cfcba7", //Set Header color
          },
          headerTintColor: "#333", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export const loginScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login", //Set Header Title
          headerLeft: () => (
            <MenuDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#cfcba7", //Set Header color
          },
          headerTintColor: "#333", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
