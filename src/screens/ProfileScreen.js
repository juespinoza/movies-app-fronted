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
} from "react-native";
import { ListItem, Rating } from "react-native-elements";
//import Config from '../constants/Config';
//import Loader from '../components/Loader';
//import moment from 'moment';
import listGeneres from "../components/ListGeneres";
//import ChangePassword from '../ChangePassword';
import { insertComment } from "../controllers/CommentsController";
import ListGeneres from "../components/ListGeneres";

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
      //listGeneres1: listGeneres
    };
  }

  componentDidMount() {
    this.checkUserSignedIn();
  }

  checkUserSignedIn = async () => {
    try {
      let value = await AsyncStorage.getItem("@user");

      console.log("USER DATA: " + value);
      if (value != null) {
        console.log("LOGGED IN ");
        let data = JSON.parse(value);
        console.log("LOGGED IN a ");
        this.setState({ genids1: data.genreIds });

        console.log("LOGGED IN b ");

        this.setState({ userEmail: data.email });
        this.setState({ userName: data.fullName });
      } else {
        console.log("NOT LOGGED IN");
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

  parseData1() {
    if (this.state.genids1) {
      console.log(this.state.genids1);

      return this.state.genids1.map((elem, i) => {
        switch (elem) {
          case 28: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Ciencia"}</Text>
              </View>
            );
          }
          case 16: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 99: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Documental"}</Text>
              </View>
            );
          }
          case 18: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Drama"}</Text>
              </View>
            );
          }
          case 10751: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Familiar"}</Text>
              </View>
            );
          }
          case 14: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Fantasia"}</Text>
              </View>
            );
          }
          case 36: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Historia"}</Text>
              </View>
            );
          }
          case 35: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 10402: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 9648: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 10749: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 9648: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 10749: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 878: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 27: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 10770: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Animación"}</Text>
              </View>
            );
          }
          case 53: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Terror"}</Text>
              </View>
            );
          }
          case 37: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Terror"}</Text>
              </View>
            );
          }
          case 12: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Terror"}</Text>
              </View>
            );
          }

          case 80: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Crimen"}</Text>
              </View>
            );
          }

          default: {
            return (
              <View style={styles.generosFavoritos} key={i.toString()}>
                <Text style={styles.generosFavoritos}>{"Otro"}</Text>
              </View>
            );
          }
        }
      });
    } else {
      <View style={styles.btnStyle}>
        <Text style={styles.name}>NO hay generos favoritos</Text>
      </View>;
    }
  }

  goTochange() {
    this.props.navigation.navigate("UpdateUserScreen");
  }

  goToBack() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    const { navigation } = this.props;
    const { genids1, userName, userEmail } = this.state;

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

        <View style={styles.generosFavoritos}>{this.parseData1()}</View>

        <View style={styles.container}>
          <View style={styles.materialButtonViolet}>
            <Button
              title="Configuraciones"
              buttonStyle={styles.btnStyle}
              onPress={this.goTochange.bind(this)}
            />
          </View>
        </View>

        {/* Change pw and cahge generes favorites buttons */}
        <View style={styles.generosFavoritos}>
          <Button
            buttonStyle={styles.generosFavoritos}
            onPress={this.goToBack.bind(this)}
            title="Volver"
          />
        </View>

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
