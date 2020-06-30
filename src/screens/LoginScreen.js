import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
} from "react-native";
import { theme, Block, Button, Input, Text } from "galio-framework";
import { login } from "../controllers/UserController";
import { showMessage, hideMessage } from "react-native-flash-message";

const { width } = Dimensions.get("window");

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedUser: null,
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    // TODO: validate email and password
    this.setLogin(data);
  };

  setLogin = async (loginData) => {
    console.log("login", loginData);
    let response = await login(loginData);

    if (response.rdo == 0) {
      this.setState({ loggedUser: response.data });
      this.storeData(response.data);
      // TODO: manage flashMessage in home
      showMessage({
        message: "Iniciaste sesion exitosamente!",
        type: "success",
      });
      this.props.navigation.navigate("HomeScreen", {
        flashMessage: response.message,
      });
    } else {
      return Alert("¡Error!", `${response.message}`);
    }
  };

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (e) {
      console.log("Error storing logged userData. Error message:", e);
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          enabled
        >
          <Block flex={2} center space="evenly">
            <Block flex center style={{ marginTop: 50 }}>
              <Image source={require("../../assets/movieIcon.png")} />
            </Block>
            <Block flex={2}>
              <Text muted center style={{ marginTop: 0, marginBottom: 20 }}>
                Ingresa con tu e-mail y contraseña
              </Text>
              <Input
                type="email-address"
                placeholder="Email"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={(text) => this.handleChange("email", text)}
              />
              <Input
                password
                viewPass
                placeholder="Contraseña"
                style={{ width: width * 0.9 }}
                onChangeText={(text) => this.handleChange("password", text)}
              />
              <Text
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                onPress={() => Alert.alert("Not implemented")}
                style={{
                  alignSelf: "flex-end",
                  lineHeight: theme.SIZES.FONT * 2,
                }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Block>
            <Block flex middle>
              <Button color="error" onPress={() => this.handleLogin()}>
                Inicia Sesion
              </Button>
              <Button
                color="transparent"
                shadowless
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text
                  center
                  color={theme.COLORS.ERROR}
                  size={theme.SIZES.FONT * 0.75}
                >
                  ¿No tienes una cuenta? Regístrate.
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
});

export default LoginScreen;
