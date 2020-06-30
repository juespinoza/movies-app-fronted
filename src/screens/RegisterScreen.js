import React from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  View,
} from "react-native";
import { theme, Block, Button, Input, Text, NavBar } from "galio-framework";
import { registration } from "../controllers/UserController";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { GENRES } from "./shared/genres";
import { showMessage, hideMessage } from "react-native-flash-message";

const items = GENRES;

const { height, width } = Dimensions.get("window");

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email: "",
      password: "",
      genreIds: [],
      selectedItems: [],
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  handleRegistration = () => {
    const data = {
      fullName: this.state.user,
      email: this.state.email,
      password: this.state.password,
      genreIds: this.state.selectedItems,
    };
    // TODO: validate user data
    this.setRegistration(data);
  };

  setRegistration = async (userData) => {
    console.log("Registrando");
    let response = await registration(userData);
    if (response.rdo == 0) {
      // TODO: manage flashMessage in home
      showMessage({
        message: "usuario creado!",
        type: "info",
      });
      this.props.navigation.navigate("LoginScreen", {
        flashMessage: response.message,
      });
    } else {
      return Alert("Usuario no registrado!", `${response.message}`);
    }
  };

  render() {
    const { navigation } = this.props;
    const { user, email, password } = this.state;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          enabled
        >
          <Block flex={2} center space="between">
            <Block flex center style={{ marginTop: 20 }}>
              <Image source={require("../../assets/movieIcon.png")} />
            </Block>
            <Block flex={4}>
              <Text
                muted
                center
                style={{ marginTop: 0, marginBottom: 20, width: width * 0.9 }}
              >
                Regístrate con tus datos para crear tus listas de películas y
                votar a tus favoritas
              </Text>
              <Input
                placeholder="Nombre"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={(text) => this.handleChange("user", text)}
              />
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
                placeholder="Password"
                style={{ width: width * 0.9 }}
                onChangeText={(text) => this.handleChange("password", text)}
              />
              <View
                style={{
                  marginTop: 15,
                  width: width * 0.9,
                  backgroundColor: "white",
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingBottom: 5,
                  paddingLeft: 5,
                }}
              >
                <SectionedMultiSelect
                  items={items}
                  uniqueKey="id"
                  subKey="generos"
                  selectText="Géneros"
                  searchPlaceholderText="Buscar"
                  selectedText="seleccionados"
                  showDropDowns={false}
                  expandDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedItems}
                />
              </View>
            </Block>
            <Block flex middle>
              <Button
                color="error"
                onPress={() => this.handleRegistration.bind(this)}
              >
                Sign up
              </Button>
              <Button
                color="transparent"
                shadowless
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text
                  center
                  color={theme.COLORS.ERROR}
                  size={theme.SIZES.FONT * 0.75}
                >
                  ¿Ya tienes una cuenta? Sign In
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

export default RegisterScreen;
