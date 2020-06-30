import React, { Children, isValidElement } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
  Alert,
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

const { height, width } = Dimensions.get("window");

export default class CreateListScreen extends React.PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      name: "",
      private: true,
      selectedMovies: [],
      selectedUsers: [],
      allMovies: [],
      allUsers: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAllMovies();
    this.getAllUsers();
  }

  componentWillUnmount() {
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
          name: "Las pelis más populares",
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

  getCurrentUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      if (jsonValue != null) {
        const currentUser = JSON.parse(jsonValue);
        this.setState({ owner: currentUser.email });
      }
    } catch (e) {
      console.error("Error getting logged user data with AsyncStorage");
    }
  };

  handleCreation = () => {
    const data = {
      name: this.state.name,
      public: !this.state.private,
      authorizedUsers: this.state.selectedUsers,
      movies: this.state.selectedMovies,
    };
    this.createMovieList(data);
  };

  validateData = () => {
    let isValid = false;
    let message = "";
    const { name, owner } = this.state;
    if (name === null || name === "") {
      isValid = false;
      message = "Verifica el nombre de la lista";
    }
    if (owner === null || owner === "") {
      isValid = false;
      message = "Tienes que estar logueado";
    }
    return { isValid, message };
  };

  createMovieList = async (listData) => {
    try {
      if (this._isMounted) {
        const currentUser = await this.getCurrentUserData();
        const email = this.state.owner;
        listData.owner = email;
        const { isValid, message } = this.validateData();
        if (!isValid) {
          let response = await createMovieList(listData);
          if (response.rdo == 0) {
            this.setState({
              name: "",
              public: false,
              selectedMovies: [],
              selectedUsers: [],
            });
            return Alert.alert(
              "Lista creada!",
              `El nombre de tu lista es: ${response.data.name}`,
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("Lists"),
                },
              ],
              { cancelable: false }
            );
          }
        } else {
          return alert("Error", message);
        }
      }
    } catch (error) {
      console.error("Error al crear lista", error);
    }
  };

  render() {
    const { navigation } = this.props;
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
