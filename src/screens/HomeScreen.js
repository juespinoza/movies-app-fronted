import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import { getEstrenos } from "../controllers/TmdbController";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Estrenos",
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      estrenos: [],
    };
  }

  componentDidMount() {
    this.onGetEstrenos();
  }

  onGetEstrenos = async () => {
    let newMovies = await getEstrenos();
    this.setState({ estrenos: newMovies, isLoading: false });
  };

  onMovieClick = (movie) => {
    this.props.navigation.navigate("Details", { movie });
  };

  renderMovieItem = ({ item }) => {
    //console.log("movie?", item);
    return (
      <TouchableHighlight onPress={() => this.onMovieClick(item)}>
        <View>
          <Image style={styles.photo} source={{ uri: item.imagen }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.release}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Some filters</Text>
        <FlatList
          data={this.state.estrenos}
          renderItem={this.renderMovieItem}
          keyExtractor={(movie) => movie.id}
        />
        <Button
          title="Ir a detalles"
          onPress={() => navigation.navigate("Details")}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    //justifyContent: "center",
  },
  text: {
    color: "#bbb",
  },
});
