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
import { getMovies } from "../controllers/TmdbController";
import { getUsers } from "../controllers/UserController";
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
      selectedMovies: [],
      selectedUsers: [],
      allMovies: [],
      allUsers: [],
    };
  }

  componentDidMount() {
    console.log("mounted");
    this._isMounted = true;
    this.getAllMovies();
    this.getAllUsers();
    // this.setCurrentUserData();
  }

  componentWillUnmount() {
    console.log("UNmounted");
    this._isMounted = false;
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onselectedMoviesChange = (selectedMovies) => {
    if (this._isMounted) {
      this.setState({ selectedMovies });
    }
  };

  onSelectedUsersChange = (selectedUsers) => {
    if (this._isMounted) {
      this.setState({ selectedUsers });
    }
  };

  getAllMovies = async () => {
    if (this._isMounted) {
      let movies = await getMovies();
      const allMovies = [
        {
          name: "Todas las Películas",
          id: 0,
          children: movies,
        },
      ];
      this.setState({ allMovies });
    }
  };

  getAllUsers = async () => {
    if (this._isMounted) {
      let users = await getUsers();
      const allUsers = [
        {
          name: "Todos los Usuarios",
          id: 0,
          children: users,
        },
      ];
      this.setState({ allUsers });
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
    const { selectedMovies, selectedUsers } = this.state;
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
        <KeyboardAvoidingView behavior="height" enabled>
          <View style={{ width: width * 0.9, marginTop: 20 }}>
            <Text muted>
              Crea una lista para tener todas tus peliculas en un lugar
            </Text>
          </View>
          <View flex={4} style={{ width: width * 0.9 }}>
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
            <View style={{ height: 125, width: width * 0.9 }}>
              <SectionedMultiSelect
                items={this.state.allUsers}
                uniqueKey="id"
                subKey="children"
                selectText="Usuarios autorizados"
                searchPlaceholderText="Buscar"
                selectedText="seleccionados"
                showDropDowns={false}
                expandDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={this.onSelectedUsersChange}
                selectedItems={selectedUsers}
              />
            </View>
            <View style={{ height: 125, width: width * 0.9 }}>
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
                onSelectedItemsChange={this.onselectedMoviesChange}
                selectedItems={selectedMovies}
              />
            </View>
          </View>
          <View flex={1} style={{ width: width * 0.9 }}>
            <Button color="error" onPress={this.handleCreation.bind(this)}>
              Crear lista
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
