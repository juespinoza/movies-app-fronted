import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import { theme, withGalio, Text, Card } from "galio-framework";
import { getEstrenos } from "../controllers/TmdbController";

class HomeScreen extends React.Component {
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
        <Card
          flex
          borderless
          style={styles.card}
          title={item.title}
          caption={item.release}
          imageStyle={styles.cardImageRadius}
          imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
          image={item.imagen}
        />
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Some filterss</Text>
        <FlatList
          data={this.state.estrenos}
          renderItem={this.renderMovieItem}
          keyExtractor={(movie) => `${movie.id}`}
        />
      </SafeAreaView>
    );
  }
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.COLORS.FACEBOOK,
    },
    text: {
      color: "#bbb",
    },
  });

export default withGalio(HomeScreen, styles);
