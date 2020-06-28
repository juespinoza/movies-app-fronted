import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuDrawerStructure from "./MenuDrawerStructure";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import LogoutScreen from "../screens/LogoutScreen";

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
          title: "Detalle de la Pelicula", //Set Header Title
          headerStyle: {
            backgroundColor: "#cfcba7", //Set Header color
          },
          headerTintColor: "#333", //Set Header text color
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
          title: "Iniciar sesion", //Set Header Title
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

export const logoutScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: "Cerrar sesion", //Set Header Title
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