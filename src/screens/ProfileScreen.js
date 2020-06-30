import React, { Component, Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Button,
  ScrollView,
  RefreshControl,
  Input,
  Dimensions,
} from "react-native";
import { ListItem, Rating } from "react-native-elements";
//import Config from '../constants/Config';
//import Loader from '../components/Loader';
//import moment from 'moment';
import listGeneres from "../components/ListGeneres";
//import ChangePassword from '../ChangePassword';
import { update } from "../controllers/UserController";
import ListGeneres from "../components/ListGeneres";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { GENRES } from "./shared/genres";
import { SaveItem, ReadItem } from "../screens/shared/storage";
import { showMessage, hideMessage } from "react-native-flash-message";

const items = GENRES;

const { width } = Dimensions.get("window");

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userToken: "",
      // user: {},
      comentario: "Mis Géneros Favoritos 3 :",
      movies: null,
      loading: false,
      showChangePw: "",
      newPw: "",
      modalVisible: false,
      generos: [],
      genprueba: [],
      selectedItems: [],
      isLoading: true,
      //listGeneres1: listGeneres
    };
  }

  componentDidMount() {
    this.checkUserSignedIn();
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  // get items for a form
  editForm = (key) => {
    ReadItem(key).then((result) => {
      const selected = JSON.parse(result);
      console.log("selectd items", selected);
      this.setState({
        selectedItems: selected,
        isLoading: false,
      });
    });
  };

  // save form data using each forms name
  saveItems = (key, value) => {
    const items = JSON.stringify(value);

    SaveItem(key, items)
      .then((res) => {
        console.info(`storaged on ${key}`);
      })
      .catch((e) => console.warn(e));
  };

  checkUserSignedIn = async () => {
    try {
      let value = await AsyncStorage.getItem("@user");

      console.log("USER DATA: " + value);
      if (value != null) {
        // console.log("LOGGED IN ");
        let data = JSON.parse(value);
        // console.log("LOGGED IN a ");
        this.setState({ genids1: data.genreIds });
        const selectedItems = GENRES[0].generos
          .filter((genero) => data.genreIds.includes(genero.id))
          .map((movie) => movie.name);
        this.saveItems("@selectedGenres", selectedItems);
        this.editForm("@selectedGenres");

        // console.log("LOGGED IN b ");
        this.setState({ userPassword: data.password });
        this.setState({ userEmail: data.email });
        this.setState({ userName: data.fullName });
      } else {
        // console.log("NOT LOGGED IN");
        setLoginGen("No Logueado");
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR GETTING USER DATA");
    }
  };

  lapsList(genids1) {
    if (listGeneres) {
      console.log(this.state.genids1);

      return this.state.genids1.map((elem, i) => {
        return (
          <View style={styles.btnStyle} key={i.toString()}>
            <Text>{elem}</Text>
          </View>
        );
      });
    } else {
      <View style={styles.btnStyle}>
        <Text style={styles.name}>NO hay generos favoritos</Text>
      </View>;
    }
  }

  parseData() {
    if (this.state.genids1) {
      console.log(this.state.genids1);

      return this.state.genids1.map((elem, i) => {
        return (
          <View style={styles.btnStyle} key={i.toString()}>
            <Text>{elem}</Text>
          </View>
        );
      });
    } else {
      <View style={styles.btnStyle}>
        <Text style={styles.name}>NO hay generos favoritos</Text>
      </View>;
    }
  }

  saveGeneros = () => {
    const { selectedItems, userName, userEmail, userPassword } = this.state;
    const data = {
      fullName: userName,
      email: userEmail,
      password: userPassword,
      genreIds: GENRES[0].generos
        .filter((genero) => selectedItems.includes(genero.name))
        .map((genero) => genero.id),
    };
    this.sendUpdate(data);
  };

  sendUpdate = async (data) => {
    const response = await update(data);

    if (response.rdo === 0) {
      console.log("Guardado");
      showMessage({
        message: "generos actualizados!",
        type: "info",
      });
    } else {
      console.log("No Guardado");
      showMessage({
        message: "hubo un error!",
        type: "error",
      });
    }
  };

  goTochange() {
    this.props.navigation.navigate("UpdateUserScreen");
  }

  goToBack() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    const { navigation } = this.props;
    const { genids1, userName, userEmail, isLoading } = this.state;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.nombreRow}>
          <Text style={styles.nombre}>Nombre:</Text>
          <Text style={styles.loremIpsum3}>{this.state.userName}</Text>
        </View>

        <View style={styles.emailRow}>
          <Text style={styles.email}>Email:</Text>
          <Text style={styles.loremIpsum5}>{this.state.userEmail}</Text>
        </View>

        <View style={styles.emailRow}>
          <Text style={styles.generosFavoritos}>Géneros Favoritos:</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginBottom: 20,
          }}
        >
          <SectionedMultiSelect
            items={items}
            loading={isLoading}
            uniqueKey="name"
            subKey="generos"
            selectText="Géneros"
            searchPlaceholderText="Buscar"
            selectedText="seleccionados"
            showDropDowns={false}
            expandDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.materialButtonViolet}>
            <Button
              title="Guardar géneros"
              buttonStyle={styles.btnStyle}
              onPress={() => this.saveGeneros()}
            />
          </View>
        </View>

        {/* Change pw and cahge generes favorites buttons */}
        {/* <View style={styles.generosFavoritos}>
          <Button
            buttonStyle={styles.generosFavoritos}
            onPress={this.goToBack.bind(this)}
            title="Volver"
          />
        </View> */}

        <Image
          source={require("../../assets/loadingIcon.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(4,80,168,1)",
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 80,
    marginLeft: 87,
  },
  loremIpsum5: {
    color: "rgba(255,255,255,1)",
    fontSize: 17,
    marginLeft: 12,
  },
  emailRow: {
    height: 20,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 61,
    marginRight: 50,
    marginBottom: 20,
  },
  btnStyle: {
    marginTop: 10,
    justifyContent: "center",
    height: 60,
  },
  nombre: {
    color: "rgba(255,255,255,1)",
    fontSize: 17,
  },
  loremIpsum: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    marginTop: -270,
    marginLeft: 37,
  },
  loremIpsum3: {
    color: "rgba(255,255,255,1)",
    fontSize: 17,
    marginLeft: 12,
  },
  nombreRow: {
    height: 20,
    flexDirection: "row",
    marginTop: 55,
    marginLeft: 61,
    marginRight: 138,
  },
  email: {
    color: "rgba(255,255,255,1)",
    fontSize: 17,
  },
  generosFavoritos: {
    color: "rgba(255,255,255,1)",
    fontSize: 17,
    marginLeft: 12,
  },
  generosFavoritosRow: {
    height: 20,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 61,
    marginRight: 50,
    marginBottom: 20,
  },
});
