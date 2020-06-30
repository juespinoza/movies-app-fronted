import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  Modal,
  View,
  Switch,
  TouchableHighlight,
} from "react-native";
import { Item, Input } from "native-base";
import { Icon, Divider } from "react-native-elements";
import { withGalio, Text, Card, Block } from "galio-framework";
import { Dropdown } from 'react-native-material-dropdown';
import { getEstrenos, findByTitle, findByFilter } from "../controllers/TmdbController";

import theme from '../theme';

// import Modal from 'react-native-modal';

class HomeScreen extends React.Component {
  // To avoid warning of setting state when component is not mounted
  // TODO: replace with a potable solution (this is a code smell)
  _isMounted = false;

  

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      estrenos: [],
      movieName: "",
      sortOrder: true,
      sortValue: "asc",
      isModalVisible: false,
      sortby: 'popularity'
    };


    this.sortbyRef = this.updateRef.bind(this, 'sortby');
  }

  componentDidMount() {
    this._isMounted = true;
    this.onGetEstrenos();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onGetEstrenos = async () => {
    let newMovies = await getEstrenos();
    if (this._isMounted) {
      this.setState({ estrenos: newMovies, isLoading: false });
    }
  };

  onSubmitSearch = async () => {
    this.setState({isLoading: true});
    let result = await findByTitle(this.state.movieName);
    this.setState({ estrenos: result, isLoading: false });
  }

  onFilterButton = async () => {
    this.setState({isLoading: true});
    this.toggleModal();
    let result = await findByFilter(this.state.sortby,this.state.sortValue);
    this.setState({ estrenos: result, isLoading: false });
  }

  onMovieClick = (movie) => {
    console.log(movie);
    this.props.navigation.navigate("Details", { movie });
  };

  toggleModal = () => {
    this.setState({isModalVisible : !this.state.isModalVisible});
  }

  toggleSwitch = (value) => {
    this.setState({sortOrder: value})
    if (value) {
      this.setState({sortValue: "asc"})
      console.log(this.state.sortValue);
    }
    else
    {
      this.setState({sortValue: "desc"})
      console.log(this.state.sortValue);
    }
    console.log(value);
  }

  onChangeText = (text) => {
    console.log(text);


    this.setState({sortby: text});
    // ['sortby', 'sortby']
    //   .map((name) => ({ name, ref: this[name] }))
    //   .filter(({ ref }) => ref && ref.isFocused())
    //   .forEach(({ name, ref }) => {
    //     this.setState({ [name]: text });
    //     console.log(name);
    //   });
  }

  updateRef(name, ref) {
    this[name] = ref;
    console.log(name);
  }

  renderMovieItem = ({ item }) => {
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
          location={(
            <Block row right>
              <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                <Icon name="bar-chart" type="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                <Text
                  p
                  color={theme.COLORS.MUTED}
                  size={theme.SIZES.FONT * 0.875}
                  style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                >
                  {item.avg}
                </Text>
              </Block>
              <Block row middle>
                <Icon name="hashtag" type="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                <Text
                  p
                  color={theme.COLORS.MUTED}
                  size={theme.SIZES.FONT * 0.875}
                  style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                >
                  {item.count}
                </Text>
              </Block>
            </Block>
          )}
        />
      </TouchableHighlight>
    );
  };

  render() {
    let { sortby, name } = this.state;
    return (
      <>
      <View style={styles.modal}>
        <Modal
          visible={this.state.isModalVisible}
          animationType="fade"
          onRequestClose={() => { this.toggleModal(); } }
          transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Block>
                <Dropdown
                  ref={this.sortbyRef}
                  value={sortby}
                  onChangeText={this.onChangeText}
                  label='Ordenar Por'
                  data={sortByData}
                />
                <Text>Orden:</Text>
                <Text>{this.state.sortOrder?'Ascendente':'Descendente'}</Text>
                <Block>
                  <Switch
                    onValueChange = {this.toggleSwitch}
                    value = {this.state.sortOrder}/>
                </Block>
              </Block>
              <Button title="Aplicar" onPress={this.onFilterButton} />
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ height: "100%" }}>
        
        <Item style={styles.itemStyle}>
          <Icon
            type="material-community"
            name="magnify"
            style={{ marginLeft: 10 }}
          />
          <Input
            name="movieName"
            placeholder="Ej: Hombre en Llamas"
            onChangeText={(movieName) => this.setState({ movieName })}
            onSubmitEditing={this.onSubmitSearch}
            value={this.state.movieName}
            style={styles.inputSearchStyle}
            rightIcon={{
              type: "material-community",
              name: "dots-vertical",
              color: "#c2c2c2",
            }}
          />
          <Icon
            type="material-community"
            name="dots-vertical"
            color="black"
            size={30}
            onPress={this.toggleModal}
            iconStyle={{
              marginRight: 15,
            }}
          />
        </Item>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.estrenos}
            renderItem={this.renderMovieItem}
            keyExtractor={(movie) => `${movie.id}`}
          />
        </SafeAreaView>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      marginBottom: 20,
    },
    centeredView: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
      marginTop: 50
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    container: {
      marginTop: 10,
      flex: 1,
      padding: 1,
      backgroundColor: theme.COLORS.FACEBOOK,
    },
    text: {
      color: "#bbb",
    },
    itemStyle: {
      marginTop: 10,
      borderRadius: 5,
      shadowRadius: 10,
      width: "95%",
      alignSelf: "center",
      backgroundColor: "white",
    },
    card: {
      margin: "1%",
      borderWidth: 2,
      padding: 0.1,
      backgroundColor: theme.COLORS.WHITE,
      width: "98%",
      marginVertical: theme.SIZES.BASE * 0.2,
    },
    cardImageRadius: {
      borderRadius: theme.SIZES.BASE * 0.1875,
    },
    modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const sortByData = [
  { value: 'popularity', label: 'Popularidad' },
  { value: 'release_date', label: 'Fecha de Estreno' },
  { value: 'vote_average', label: 'Promedio de Votos' },
  { value: 'vote_count', label: 'Cantidad de Votos' }
];

export default withGalio(HomeScreen);
