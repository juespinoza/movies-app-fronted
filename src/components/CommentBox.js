import React, { useState, useContext } from "react";
import { Button as Boton } from "native-base";
import { Rating, AirbnbRating, Button } from "react-native-elements";
import { View, StyleSheet, TextInput, Text } from "react-native";

import { insertComment } from "../controllers/CommentsController";

export default function CommentBox({userLoggedIn, userData, movieId}) {
  const [stars, setStars] = useState(3);
  const [comment, setComment] = useState("");
  const {checkLogin} = userLoggedIn;

  const ratingCompleted = (rating) => {
      console.log("El puntaje es: " + rating)
      setStars(rating)
  };

  const sendComment = async () => {
     let now = new Date();
      
      data = JSON.parse(userData);
      console.log(movieId);
      console.log(data.email);
      console.log(stars);
      console.log(data.fullName);
      console.log(now);
      console.log(comment);
    //   this.setState({loading: true});
      let result = insertComment(movieId,data,stars,now,comment);
    //   console.log(result);
    //   this.setState({ commentData: result, loading: false });
      
  };

  const onChangeTxt = (e) => setComment(e);

    return (
        
        <View style={styles.comentariosContainer}>
        {userLoggedIn && (
            <>
            <View style={{ height: 120 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Comentario</Text>
                </View>
                <TextInput
                style={styles.input}
                multiline={true}
                onChangeText={(e) => onChangeTxt(e)}
                />
            </View>
            <View style={styles.sendComment}>
                <View style={styles.infoContainer}>
                <AirbnbRating
                    reviews={["Muy Mala", "Mala", "Meh", "Buena", "Muy buena"]}
                    onFinishRating={ratingCompleted}
                    size={30}
                    showRating={false}
                />
                </View>
                
                <Button
                    title="Comentar"
                    buttonStyle={styles.btnStyle}
                    onPress={sendComment}
                />
                
            </View>
            </>
        )}
        {!userLoggedIn && (
            <>
            <View style={{ height: 120 }}>
                <Text> Tenes que estar logueado para comentar </Text>
            </View>
            <View style={styles.sendComment}>
                <Button
                    title="Comentar"
                    buttonStyle={styles.btnStyle}
                    onPress={sendComment}
                />
            </View>
            </>
        )}
        </View>
        
        );
    }

const styles = StyleSheet.create({
  containerAccordion: {
    width: "100%",
  },
  botonComentar: {
    marginTop: 30,
  },
  comentariosContainer: {
    width: "100%",
    height: 200,
    marginTop: 40,
  },
  input: {
    paddingRight: 10,
    lineHeight: 13,
    flex: 2,
    textAlignVertical: "top",
    borderWidth: 1,
    width: "100%",
  },
  btnStyle: {
    marginTop: 10,
    justifyContent: "center",
    height: 30,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  sendComment: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
