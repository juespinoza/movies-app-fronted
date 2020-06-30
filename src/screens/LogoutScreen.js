import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";

import { showMessage, hideMessage } from "react-native-flash-message";

function LogoutScreen(props) {

    const [loginName, setLoginName] = useState("");
    const [loginEmail, setLoginEmail] = useState("");

    useEffect(() => {
        checkUserSignedIn();
    }, []);

    checkUserSignedIn = async () =>{
        try {
            let value = await AsyncStorage.getItem("@user");
            console.log("USER DATA: " + value);
            if (value != null){
                console.log("LOGGED IN LOGOUT SCREEN");
                let data = JSON.parse(value);
                setLoginName(data.fullName);
                setLoginEmail(data.email);
            }
            else {
                console.log("NOT LOGGED IN  LOGOUT SCREEN");
                setLoginName("No Logueado");
                setLoginEmail("No Logueado");
            }
        } catch (error) {
            console.log(error);
            console.log("ERROR GETTING USER DATA");
        }
    }

    const logoutUser = async () => {
        await AsyncStorage.removeItem("@user");
        // console.log(loginName);
        // checkUserSignedIn();
        showMessage({
            message: "Sesion cerrada con exito!",
            type: "info",
          })
        props.navigation.navigate("Home", {
            flashMessage: "Sesion Cerrada con Exito!",
        });
     };




  return (
    <View style={styles.container}>
        <View style={styles.materialButtonViolet}>
            <Button
                title="Cerrar Sesion"
                buttonStyle={styles.btnStyle}
                onPress={logoutUser}
            />
        </View>
      <Text style={styles.loremIpsum}>
        Estas seguro de querer cerrar sesion?
      </Text>
      <View style={styles.nombreRow}>
        <Text style={styles.nombre}>Nombre:</Text>
        <Text style={styles.loremIpsum3}>{loginName}</Text>
      </View>
      <View style={styles.emailRow}>
        <Text style={styles.email}>Email:</Text>
        <Text style={styles.loremIpsum5}>{loginEmail}</Text>
      </View>
      <Image
        source={require("../../assets/loadingIcon.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  btnStyle: {
    marginTop: 10,
    justifyContent: "center",
    height: 60,
  },
  sendComment: {
    flexDirection: "row",
    justifyContent: "center",
  },
  materialButtonViolet: {
    height: 78,
    width: 174,
    marginTop: 367,
    alignSelf: "center"
  },
  loremIpsum: {
    color: "black",
    fontSize: 18,
    marginTop: -270,
    marginLeft: 37
  },
  nombre: {
    color: "black",
    fontSize: 17
  },
  loremIpsum3: {
    color: "black",
    fontSize: 17,
    marginLeft: 12
  },
  nombreRow: {
    height: 20,
    flexDirection: "row",
    marginTop: 55,
    marginLeft: 61,
    marginRight: 138
  },
  email: {
    color: "black",
    fontSize: 17
  },
  loremIpsum5: {
    color: "black",
    fontSize: 17,
    marginLeft: 31
  },
  emailRow: {
    height: 20,
    flexDirection: "row",
    marginTop: 28,
    marginLeft: 61,
    marginRight: 138
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 182,
    marginLeft: 87
  }
});

export default LogoutScreen;
