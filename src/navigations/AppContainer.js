import "react-native-gesture-handler";
import * as React from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { homeScreen, registerScreen, loginScreen } from "./RouteStackStructure";

const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");

function AppContainer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#4f4d37",
          itemStyle: { marginVertical: 5 },
          labelStyle: { width: width * 0.4 },
        }}
      >
        <Drawer.Screen
          name="HomeScreen"
          options={{ drawerLabel: "Buscar Pelis" }}
          component={homeScreen}
        />
        <Drawer.Screen
          name="LoginScreen"
          options={{ drawerLabel: "Iniciar Sesion" }}
          component={loginScreen}
        />
        <Drawer.Screen
          name="RegisterScreen"
          options={{ drawerLabel: "Registrarse" }}
          component={registerScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
