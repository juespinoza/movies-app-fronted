import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { homeScreen, registerScreen, loginScreen } from "./RouteStackStructure";

const Drawer = createDrawerNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#000",
          itemStyle: { marginVertical: 5 },
        }}
      >
        <Drawer.Screen
          name="HomeScreen"
          options={{ drawerLabel: "Home" }}
          component={homeScreen}
        />
        <Drawer.Screen
          name="LoginScreen"
          options={{ drawerLabel: "Login" }}
          component={loginScreen}
        />
        <Drawer.Screen
          name="RegisterScreen"
          options={{ drawerLabel: "Sign up" }}
          component={registerScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
