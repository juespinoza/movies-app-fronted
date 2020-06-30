import "react-native-gesture-handler";
import * as React from "react";
import { useState, useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Text, Block } from "galio-framework";
import AsyncStorage from "@react-native-community/async-storage";

import FlashMessage from "react-native-flash-message";

import theme from "../theme";
import {
  homeScreen,
  registerScreen,
  loginScreen,
  logoutScreen,
  movieListsScreen,
  profileScreen,
  updateUserScreen,
  createListsScreen,
  manageListsScreen,
} from "./RouteStackStructure";

const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");

class Hidden extends React.Component {
  render() {
    return null;
  }
}

function AppContainer() {
  const CustomDrawerContentComponent = (props) => (
    <SafeAreaView
      style={styles.drawer}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block space="between" row style={styles.header}>
        {/* <Block flex={0.3}><Image source={{ uri: 'http://i.pravatar.cc/100' }} style={styles.avatar} /></Block> */}
        <Block flex style={styles.middle}>
          <Text size={theme.SIZES.FONT * 0.875}>MovieApp</Text>

          <Text muted size={theme.SIZES.FONT * 0.875}>
            Anonimo
          </Text>
        </Block>
      </Block>
      <ScrollView>{/* <DrawerItems {...props} /> */}</ScrollView>
    </SafeAreaView>
  );

  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    checkUserSignedIn2();
  }, []);

  checkUserSignedIn2 = async () => {
    try {
      let value = await AsyncStorage.getItem("@user");
      console.log("USER DATA IN MENU: " + value);
      if (value != null) {
        console.log("LOGGED IN");
        console.log(isLoggedIn);
        setIsLoggedIn(true);
      } else {
        console.log("NOT LOGGED IN IN MENU");
        setIsLoggedIn(false);
        console.log(isLoggedIn);
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR GETTING USER DATA");
    }
  };
  this.interval = setInterval(() => this.checkUserSignedIn2(), 4000);

  return (
    <>
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
          {!isLoggedIn && (
            <Drawer.Screen
              name="LoginScreen"
              options={{ drawerLabel: "Iniciar Sesion" }}
              component={loginScreen}
            />
          )}
          <Drawer.Screen
            name="Lists"
            options={{ drawerLabel: "Ver listas de pelis" }}
            component={movieListsScreen}
          />
          <Drawer.Screen
            name="Createlists"
            options={{ drawerLabel: "Crear Lista de pelis" }}
            component={createListsScreen}
          />
          <Drawer.Screen
            name="Managelists"
            options={{ drawerLabel: "Adminitrar Lista de pelis" }}
            component={manageListsScreen}
          />
          {!isLoggedIn && (
            <Drawer.Screen
              name="RegisterScreen"
              options={{ drawerLabel: "Registrarse" }}
              component={registerScreen}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="LogoutScreen"
              options={{ drawerLabel: "Cerrar Sesion" }}
              component={logoutScreen}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="ProfileScreen"
              options={{ drawerLabel: "Perfil" }}
              component={profileScreen}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="UpdateUserScreen"
              options={{ drawerLabel: "Configuración" }}
              component={updateUserScreen}
            />
          )}
        </Drawer.Navigator>
      </NavigationContainer>
      <FlashMessage position="bottom" />
    </>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 0.6875,
    paddingBottom: theme.SIZES.BASE * 1.6875,
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 0.5,
    marginTop: Platform.OS === "android" ? theme.SIZES.BASE * 2 : null,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: "center",
  },
});

export default AppContainer;
