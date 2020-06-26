import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import homeScreenStack from "./RouteStackStructure";

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
          component={homeScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
