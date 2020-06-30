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
  FlatList,
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
import { createMovieList } from "../controllers/MovieListController";
import theme from "../theme";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { getMovies } from "../controllers/TmdbController";
import { getMyLists } from "../controllers/MovieListController";

const { height, width } = Dimensions.get("window");

export default class ManageListsScreen extends React.PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      myLists: [],
      isLoading: true,
      owner: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMyLists();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onEditList = () => {
    //editing
  };

  onDeleteList = () => {
    //editing
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

  getMyLists = async () => {
    try {
      if (this._isMounted) {
        const currentUser = await this.getCurrentUserData();
        const { owner } = this.state;
        if (owner !== "") {
          let response = await getMyLists({ owner });
          if (response.rdo == 0) {
            this.setState({ myLists: response.data, isLoading: false });
          }
        } else {
          return alert("Error", "Usuario no logueado");
        }
      }
    } catch (error) {
      console.error("Error al traer mis listas", error);
    }
  };

  renderListItem = ({ item }) => {
    return (
      <Block
        safe
        flex
        center
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "stretch",
          width: width * 0.9,
          marginLeft: 20,
        }}
      >
        <View style={{ width: width * 0.8, marginTop: 10 }}>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() =>
              this.props.navigation.navigate("EditList", { list: item })
            }
          >
            <Card
              flex
              center
              borderless
              shadowColor={theme.COLORS.BLACK}
              style={styles.author}
              title={item.name}
              caption={item.owner}
              avatar="http://lorempixel.com/80/80/abstract/" //"https://picsum.photos/80"
              location={
                <Block row>
                  <Block
                    row
                    middle
                    style={{ marginHorizontal: theme.SIZES.BASE }}
                  >
                    <Icon
                      name={item.public ? "eye" : "eye-slash"}
                      family="font-awesome"
                      color={theme.COLORS.MUTED}
                      size={theme.SIZES.FONT * 0.875}
                    />
                    <Text
                      p
                      color={theme.COLORS.MUTED}
                      size={theme.SIZES.FONT * 0.875}
                      style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                    >
                      {item.public ? "Publico" : "Privado"}
                    </Text>
                  </Block>
                  <Block row middle>
                    <Icon
                      name="film"
                      family="font-awesome"
                      color={theme.COLORS.MUTED}
                      size={theme.SIZES.FONT * 0.875}
                    />
                    <Text
                      p
                      color={theme.COLORS.MUTED}
                      size={theme.SIZES.FONT * 0.875}
                      style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                    >
                      {item.movies.length}
                    </Text>
                  </Block>
                </Block>
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: width * 0.2, marginTop: 20 }}>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => console.log(item._id)}
          >
            <Icon
              name="trash-o"
              family="font-awesome"
              color={theme.COLORS.ERROR}
              size={theme.SIZES.FONT * 2}
            />
          </TouchableOpacity>
        </View>
      </Block>
    );
  };

  render() {
    const { navigation } = this.props;
    const { myLists, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {/* {currentUser !== null && ( */}
        <Block flex={3}>
          <Block center style={{ paddingTop: 20 }}>
            <Text muted>Puedes editar o liminar tus listas</Text>
          </Block>
          {isLoading && (
            <Text flex center>
              Cargando mis listas...
            </Text>
          )}
          {!isLoading && (
            <Block>
              {myLists.length > 0 && (
                <FlatList
                  data={myLists}
                  renderItem={this.renderListItem}
                  keyExtractor={(item) => item._id}
                />
              )}
              {myLists.length === 0 && (
                <Text flex center style={{ marginTop: 20 }}>
                  No tienes listas creadas.
                </Text>
              )}
            </Block>
          )}
        </Block>
        {/* )} */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
