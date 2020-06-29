import React, { Children } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
} from "react-native";
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
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { getEstrenos } from "../controllers/TmdbController";
import { useScreens } from "react-native-screens";

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
      selectedItems: [],
      allMovies: [],
    };
  }

  componentDidMount() {
    console.log("mounted");
    this._isMounted = true;
    this.getAllMovies();
    //this.getAllUsers();
    // this.setCurrentUserData();
  }

  componentWillUnmount() {
    console.log("UNmounted");
    this._isMounted = false;
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  onSelectedItemsChange = (selectedItems) => {
    if (this._isMounted) {
      this.setState({ selectedItems });
    }
  };

  getAllMovies = async () => {
    if (this._isMounted) {
      let movies = await getEstrenos();
      const allMovies = [
        {
          name: "Todas las Películas",
          id: 0,
          children: movies.map((movie) => ({
            name: movie.title,
            id: movie.id,
          })),
        },
      ];
      this.setState({ allMovies });
      console.log("stated movies?---------", this.state.allMovies);
    }
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

  handleCreation = () => {
    const data = {
      name: this.state.name,
      public: !this.state.private,
      owner: this.state.owner,
      authorizedUsers: this.state.authorizedUsers.split(", "),
      movies: this.state.movies,
    };
    // TODO: validate data
    this.createMovieList(data);
  };

  createMovieList = async (listData) => {
    console.log("creating list: ", listData);
    // let response = await createMovieList(listData);
    // if (response.rdo == 0) {
    //   // TODO: manage flashMessage in home
    //   // this.props.navigation.navigate("Lists", {
    //   //   flashMessage: response.message,
    //   // });
    // } else {
    //   return Alert("Usuario no registrado!", `${response.message}`);
    // }
  };

  render() {
    const { allMovies, selectedItems } = this.state;
    return (
      <Block
        safe
        flex
        center
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {/* <KeyboardAvoidingView behavior="height" enabled> */}
        <View style={{ width: width * 0.9, marginTop: 20 }}>
          <Text muted>
            Crea una lista para tener todas tus peliculas en un lugar
          </Text>
        </View>
        <View flex={3} style={{ width: width * 0.9 }}>
          <Input
            placeholder="Nombre de la lista"
            autoCapitalize="none"
            onChangeText={(text) => this.handleChange("name", text)}
            style={{ marginTop: 15 }}
          />
          <Checkbox
            color="#666"
            initialValue={true}
            label="Lista privada"
            iconFamily="font-awesome"
            iconName="lock"
            onChange={(value) => this.handleChange("private", value)}
            style={{ marginTop: 5, alignSelf: "flex-end" }}
          />
          <Input
            placeholder="Emails de usuarios autorizados"
            onChangeText={(text) => this.handleChange("authorizedUsers", text)}
            style={{ marginTop: 15 }}
          />
          <View style={{ height: 100, width: width * 0.9 }}>
            <SectionedMultiSelect
              items={this.state.allMovies}
              uniqueKey="id"
              subKey="children"
              selectText="Peliculas deseadas"
              searchPlaceholderText="Buscar"
              selectedText="seleccionadas"
              showDropDowns={false}
              expandDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
            />
          </View>
        </View>
        <View flex={1} style={{ width: width * 0.9 }}>
          <Button color="error" onPress={this.handleCreation.bind(this)}>
            Crear lista
          </Button>
        </View>
        {/* </KeyboardAvoidingView> */}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
