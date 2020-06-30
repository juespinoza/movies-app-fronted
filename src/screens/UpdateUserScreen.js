import CheckBox from "../components/CheckBox";
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
//import ChangePassword from './ChangePassword';
import { insertComment } from "../controllers/CommentsController";

export default class UpdateUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPw: "",
      termsAccepted: false,
    };

    // this.changePw1 = this.changePw1.bind(this);
  }

  componentDidMount() {
    this.checkUserSignedIn();
  }
  /*
    goBack(){
      this.props.navigation.navigate('HomeScreen');
    }*/

  checkUserSignedIn = async () => {
    try {
      let value = await AsyncStorage.getItem("@user");

      console.log("USER DATA: " + value);
      if (value != null) {
        let data = JSON.parse(value);

        this.setState({ genids1: data.genreIds });

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

  handleCheckBox = () =>
    this.setState({ termsAccepted: !this.state.termsAccepted });

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
        <View style={{}}>
          <CheckBox
            selected={this.state.termsAccepted}
            idGe={28}
            onPress={this.handleCheckBox}
            text="Ciencia"
          />
          <CheckBox
            selected={this.state.termsAccepted}
            onPress={this.handleCheckBox}
            text="Fantasia"
          />
          <CheckBox
            selected={this.state.termsAccepted}
            onPress={this.handleCheckBox}
            text="Animación"
          />
          <CheckBox
            selected={this.state.termsAccepted}
            onPress={this.handleCheckBox}
            text="Crimen"
          />
          <CheckBox
            selected={this.state.termsAccepted}
            onPress={this.handleCheckBox}
            text="Terror"
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
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 182,
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
