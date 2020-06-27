import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { SafeAreaView, Dimensions, StyleSheet, FlatList } from "react-native";
import { Accordion, Text, Block } from "galio-framework";

const { height, width } = Dimensions.get("window");

export default class MovieLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      movies: null,
    };
  }

  componentDidMount() {
    this.setCurrentUser();
    this.getMovies();
  }

  setCurrentUser = () => {
    const currentUser = this.getData();
    this.setState({ currentUser });
  };

  getData = async () => {
    console.log("getting current user");
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      console.log("user data", jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("Error getting logged user data");
    }
  };

  getMovies = async () => {
    // TODO: call to api
    console.log("llamando a la api de todas las listas");
  };

  render() {
    const { currentUser, movieLists } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {console.log("CU in render", currentUser)}
        {currentUser !== null && (
          <Block>
            {/* TODO: add buttons for navigation to mis listas, públicas, siguiendo */}
            <Text flex center h5 muted>
              Todas las listas públicas
            </Text>
            <FlatList
              data={movieLists}
              renderItem={({ item }) => <Item title={item.title} />}
              keyExtractor={(item) => item.id}
            />
          </Block>
        )}
        {currentUser === null && (
          <Text flex center muted>
            Tienes que estar logueado!
          </Text>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
