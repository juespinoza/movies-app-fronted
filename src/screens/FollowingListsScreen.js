import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Block, Card, Icon, Button } from "galio-framework";
import { getFollowingLists } from "../controllers/MovieListController";
import theme from "../theme";

const { height, width } = Dimensions.get("window");

export default class FollowingListsScreen extends React.PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      movieLists: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMovies();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCurrentUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      if (jsonValue != null) {
        this.setState({ currentUser: JSON.parse(jsonValue) });
      }
    } catch (e) {
      console.error("Error getting logged user data with AsyncStorage");
    }
  };

  getMovies = async () => {
    try {
      const currentUser = await this.getCurrentUserData();
      if (
        this._isMounted &&
        (currentUser != "undefined" || currentUser != null)
      ) {
        const { email } = this.state.currentUser;
        const ownerData = { email };
        let response = await getFollowingLists(ownerData);
        if (this._isMounted && response.rdo == 0) {
          this.setState({ movieLists: response.data, isLoading: false });
        }
      } else {
      }
    } catch (error) {
      console.error("Error en get following lists: ", error);
    }
  };

  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => console.log(item._id)}>
        <Card
          flex
          center
          borderless
          shadowColor={theme.COLORS.BLACK}
          style={styles.author}
          title={item.name}
          caption={`${item.owner.slice(0, 16)}...`}
          avatar="http://lorempixel.com/80/80/abstract/" //"https://picsum.photos/80"
          location={
            <Block row>
              <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
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
    );
  };

  render() {
    const { navigation } = this.props;
    const { movieLists, isLoading, currentUser } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {currentUser !== null && (
          <Block flex={3}>
            <Block center style={{ paddingTop: 20 }}>
              <Text muted>Listas de películas a las que tienes acceso</Text>
            </Block>
            {isLoading && (
              <Text flex center>
                Cargando las listas a las que tienes acceso...
              </Text>
            )}
            {!isLoading && (
              <Block>
                {movieLists.length > 0 && (
                  <FlatList
                    data={movieLists}
                    renderItem={this.renderListItem}
                    keyExtractor={(item) => item._id}
                  />
                )}
                {movieLists.length === 0 && (
                  <Text flex center style={{ marginTop: 20 }}>
                    No tienes acceso a ninguna lista privada.
                  </Text>
                )}
              </Block>
            )}
          </Block>
        )}
        {currentUser === null && (
          <Block flex middle>
            <Text center color={theme.COLORS.ERROR}>
              Tienes que estar logueado para ver esta sección.
            </Text>
            {/* <Button
              size="small"
              color="error"
              onPress={navigation.navigate("Login")}
            >
              Ingresa aquí
            </Button> */}
          </Block>
        )}
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
