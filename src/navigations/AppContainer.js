import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={require("../../assets/menuIcon.png")}
          style={{ width: 24, height: 24, marginLeft: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Peliculas", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
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
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          title: "Movie Details", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

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
