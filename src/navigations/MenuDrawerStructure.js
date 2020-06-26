import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";

const MenuDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={require("../../assets/menuIcon.png")}
          style={{ width: 24, height: 24, marginLeft: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MenuDrawerStructure;
