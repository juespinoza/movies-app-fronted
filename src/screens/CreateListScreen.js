import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { SafeAreaView, Dimensions, StyleSheet, TextInput } from "react-native";
import {
  Text,
  Block,
  Card,
  Icon,
  Button,
  Checkbox,
  Input,
} from "galio-framework";
import { createMovieList } from "../controllers/MovieListController";
import theme from "../theme";

const { height, width } = Dimensions.get("window");

export default class CreateListScreen extends React.PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      authorizedUsers: [],
      name: "",
      private: true,
      movies: [],
    };
  }

  componentDidMount() {
    console.log("mounted");
    this._isMounted = true;
    // this.setCurrentUserData();
  }

  componentWillUnmount() {
    console.log("UNmounted");
    this._isMounted = false;
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  // setCurrentUserData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@user");
  //     if (jsonValue != null) {
  //       currentUser = JSON.parse(jsonValue);
  //       console.log("encontramos user: ", currentUser);
  //       this.setState({ owner: currentUser.email });
  //       console.log("state user: ", this.state.owner);
  //     }
  //   } catch (e) {
  //     console.error("Error getting logged user data with AsyncStorage");
  //   }
  // };

  // handleCreation = () => {
  //   const data = {
  //     name: this.state.name,
  //     public: !this.state.private,
  //     owner: this.state.owner,
  //     authorizedUsers: this.state.authorizedUsers,
  //     movies: this.state.movies,
  //   };
  //   // TODO: validate user data
  //   this.setMovieList(data);
  // };

  // setMovieList = async (listData) => {
  //   let response = await createMovieList(listData);
  //   if (response.rdo == 0) {
  //     // TODO: manage flashMessage in home
  //     // this.props.navigation.navigate("Lists", {
  //     //   flashMessage: response.message,
  //     // });
  //   } else {
  //     return Alert("Usuario no registrado!", `${response.message}`);
  //   }
  // };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Block flex={4} center style={{ width: width * 0.9, marginTop: 20 }}>
          <Text
            muted
            center
            style={{ marginTop: 0, marginBottom: 20, width: width * 0.9 }}
          >
            Crea una lista para tener todas tus peliculas en un lugar
          </Text>
          <Input
            placeholder="Nombre de la lista"
            autoCapitalize="none"
            style={{ width: width * 0.9 }}
            onChangeText={(text) => this.handleChange("name", text)}
          />
          <Checkbox
            color="#666"
            initialValue={true}
            label="Lista privada"
            iconFamily="font-awesome"
            iconName="lock"
            onChange={(value) => this.handleChange("private", value)}
          />
          <TextInput
            placeholder="Emails de usuarios autorizados"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: width * 0.9,
            }}
            onChangeText={(text) => this.handleChange("authorizedUsers", text)}
          />
          {/* TODO: implement genre list */}
        </Block>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  author: {
    marginTop: 15,
    width: width * 0.9,
  },
});
