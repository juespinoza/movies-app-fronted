import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Comment from "./Comment";

export default function CommentList({commentData}) {
  return (
    <View style={styles.containerComentarios}>
      {commentData.map((data) => (
        <Comment key={Math.random()} body={data.body} date={data.date} email={data.email} fullName={data.fullName} stars={data.stars}/>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerComentarios: {
    flex: 1,
    width: "100%",
    borderTopWidth: 0.7,
    borderTopColor: "#7CB1D7"
  },
  textoComentario: {
    marginTop: 10,
    fontStyle: "italic",
  },
  tituloComentarios: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
