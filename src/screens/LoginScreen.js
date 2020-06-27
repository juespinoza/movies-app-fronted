import React from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Image,
} from "react-native";

// galio component
import { theme, Block, Button, Input, NavBar, Text } from "galio-framework";

const { height, width } = Dimensions.get("window");

class LoginScreen extends React.Component {
  state = {
    username: "",
    password: "",
    token: "",
    loginSuccess: false,
    loggedUser: null,
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
    console.log(this.state[name]);
  };

  handleLogin = () => {
    console.log("this is the login handle;");
  };

  // componentDidMount() {
  //   // this.getRequestToken();
  // }

  // getRequestToken() {
  //   const url = "http://s1.ebrainte.com/47000/user/login";

  //   fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       this.setState({
  //         requestToken: responseData.request_token,
  //       });
  //       console.log(responseData.requestToken);
  //     });
  // }

  // getLoginData() {
  //   const data = {
  //     email: this.state.username,
  //     password: this.state.password,
  //   };
  //   console.log(data);
  //   let url = "http://s1.ebrainte.com:47000/user/login";

  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState({ loginSuccess: true });
  //       this.setState({ userData: data });
  //       RootNavigation.navigate("Buscar", {
  //         userData: data,
  //         loginSuccess: true,
  //       });
  //       console.log(data);
  //     });
  // }

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          enabled
        >
          <Block flex={2} center space="between">
            <Block flex center style={{ marginTop: 50 }}>
              <Image source={require("../../assets/movieIcon.png")} />
            </Block>
            <Block flex={2}>
              <Text muted center style={{ marginTop: 0, marginBottom: 20 }}>
                Ingresa con tu usuario y contrasena
              </Text>
              <Input
                type="email-address"
                placeholder="Nombre de Usuario"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={(text) => this.handleChange("username", text)}
              />
              <Input
                password
                viewPass
                placeholder="Contrasena"
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
                Forgot your password?
              </Text>
            </Block>
            <Block flex middle>
              <Button color="error" onPress={this.handleLogin.bind(this)}>
                Sign in
              </Button>
              <Button
                color="transparent"
                shadowless
                onPress={() => navigation.navigate("Register")}
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
