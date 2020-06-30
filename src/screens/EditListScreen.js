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
  TouchableOpacity,
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
import { updateMovieList } from "../controllers/MovieListController";
import theme from "../theme";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { getMovies, getAmovie } from "../controllers/TmdbController";
import { getUsers } from "../controllers/UserController";
import { SaveItem, ReadItem } from "../screens/shared/storage";

const { height, width } = Dimensions.get("window");

export default class EditListScreen extends React.PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    const {
      params: { list },
    } = props.route;
    this.state = {
      list: list,
      owner: list.owner,
      name: list.name,
      private: !list.public,
      selectedMovies: [],
      selectedUsers: [],
      allMovies: [],
      allUsers: [],
      usersLoading: true,
      moviesLoading: true,
      previousMovies: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAllUsers();
    this.getAllMovies();
    this.setPreviousMovies();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setPreviousMovies = async () => {
    if (this._isMounted) {
      const { list } = this.state;
      const previousMovies = [];

      for (const id of list.movies) {
        const movie = await this.getMovie(id);
        previousMovies.push(movie);
      }
      this.setState({ previousMovies });
    }
  };

  getMovie = async (id) => {
    if (this._isMounted) {
      const movie = await getAmovie(id);
      return movie;
    }
  };

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
      this.saveItems("@selectedUsers", selectedUsers);
      this.editForm("@selectedUsers");
    }
  };

  setSelectedUsers = () => {
    if (this._isMounted) {
      const { list, allUsers } = this.state;
      const selectedItems = allUsers[0].users
        .filter((user) => list.authorizedUsers.includes(user.id))
        .map((movieObj) => movieObj.name);
      this.saveItems("@selectedUsers", selectedItems);
      this.editForm("@selectedUsers");
      this.setState({ usersLoading: false });
    }
  };

  removePrevMovies = (id) => {
    if (this._isMounted) {
      const { previousMovies } = this.state;
      if (previousMovies.length > 0) {
        const currentMovies = previousMovies.filter((movie) => movie.id !== id);
        this.setState({ previousMovies: currentMovies });
      }
    }
  };

  // get items for a form
  editForm = (key) => {
    if (this._isMounted) {
      ReadItem(key).then((result) => {
        if (this._isMounted && key == "@selectedUsers") {
          const selected = JSON.parse(result);

          this.setState({
            selectedUsers: selected,
          });
        }
      });
    }
  };

  // save form data using each forms name
  saveItems = (key, value) => {
    if (this._isMounted) {
      const items = JSON.stringify(value);

      SaveItem(key, items)
        .then((res) => {
          console.info(`storaged on ${key}`);
        })
        .catch((e) => console.warn(e));
    }
  };

  getAllMovies = async () => {
    try {
      if (this._isMounted) {
        const { list } = this.state;
        let movies = await getMovies();
        const allMovies = [
          {
            name: "Las pelis más populares",
            id: 0,
            movies: movies.filter((movie) => !list.movies.includes(movie.id)),
          },
        ];
        this.setState({ allMovies, moviesLoading: false });
      }
    } catch (error) {
      console.error("Error saving async pelis", error);
    }
  };

  getAllUsers = async () => {
    if (this._isMounted) {
      let users = await getUsers();
      const allUsers = [
        {
          name: "Todos los Usuarios",
          id: 0,
          users,
        },
      ];
      this.setState({ allUsers });
      this.setSelectedUsers();
    }
  };

  handleCreation = () => {
    const { selectedMovies, previousMovies } = this.state;
    const prevIds = previousMovies.map((movie) => movie.id);
    let movies = selectedMovies.concat(prevIds);

    const data = {
      name: this.state.name,
      public: !this.state.private,
      authorizedUsers: this.state.selectedUsers,
      movies,
    };
    console.log("data to send", data);
    this.updateMovieList(data);
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

  updateMovieList = async (listData) => {
    try {
      if (this._isMounted) {
        const { isValid, message } = this.validateData();
        if (!isValid) {
          let response = await updateMovieList(listData);
          if (response.rdo == 0) {
            this.setState({
              name: "",
              public: false,
              selectedMovies: [],
              selectedUsers: [],
            });
            return Alert.alert(
              "Lista editada",
              `Ya puedes ver tus listas.`,
              [
                {
                  text: "Listas públicas",
                  onPress: () => this.props.navigation.navigate("Lists"),
                },
                {
                  text: "Mis listas",
                  onPress: () => this.props.navigation.goBack(),
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
    const { moviesLoading, usersLoading, previousMovies } = this.state;
    const isLoading = moviesLoading && usersLoading;

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
        {isLoading && <Text>Cargando datos..</Text>}
        {!isLoading && (
          <KeyboardAvoidingView behavior="height" enabled>
            <View style={{ width: width * 0.9, marginTop: 20 }}>
              <Text muted>
                Crea una lista para tener todas tus peliculas en un lugar
              </Text>
            </View>
            <View flex={4} style={{ width: width * 0.9 }}>
              <Input
                placeholder="Nombre de la lista"
                value={this.state.name}
                autoCapitalize="none"
                onChangeText={(text) => this.handleChange("name", text)}
                style={{ marginTop: 15 }}
              />
              <Checkbox
                color="#666"
                initialValue={this.state.private}
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
                  loading={isLoading}
                  uniqueKey="id"
                  subKey="users"
                  selectText="Usuarios autorizados"
                  searchPlaceholderText="Buscar"
                  selectedText="seleccionados"
                  showDropDowns={false}
                  expandDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={this.onSelectedUsersChange}
                  selectedItems={this.state.selectedUsers}
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
                  loading={isLoading}
                  uniqueKey="id"
                  subKey="movies"
                  selectText="Peliculas deseadas"
                  searchPlaceholderText="Buscar"
                  selectedText="seleccionadas"
                  showDropDowns={false}
                  expandDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={this.onselectedMoviesChange}
                  selectedItems={this.state.selectedMovies}
                />
              </View>
              {/* Work around because previous selected movies could not be
               present on the list of all movies that we get now */}
              <View style={{ padding: 5 }}>
                <Text>Peliculas previas: </Text>
                {previousMovies.map((movie) => (
                  <Block
                    key={`movie-${movie.id}`}
                    styles={{ backgroundColor: "white" }}
                  >
                    <Text style={{ margin: 5 }}>
                      {movie.name}{" "}
                      <Icon
                        name="trash-o"
                        family="font-awesome"
                        color={theme.COLORS.ERROR}
                        size={theme.SIZES.FONT * 0.8}
                        onPress={() => this.removePrevMovies(movie.id)}
                      />
                    </Text>
                  </Block>
                ))}
              </View>
            </View>
            <View flex={1} style={{ width: width * 0.9 }}>
              <Button color="error" onPress={this.handleCreation.bind(this)}>
                Editar
              </Button>
            </View>
          </KeyboardAvoidingView>
        )}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
