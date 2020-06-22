import * as React from "react";
import AppContainer from "./src/navigations/AppContainer";

function App() {
  return <AppContainer />;
}

export default App;

// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Image,
//   TouchableNativeFeedback,
//   Button,
// } from "react-native";

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.text}>
//         elly-o gummi bears wafer. Oat cake cupcake bonbon toffee. Jelly tiramisu
//         gummi bears jelly beans dragée dragée cupcake fruitcake. Jelly beans
//         pastry toffee halvah caramels.
//       </Text>
//       <Button title="click me" onPress={() => console.log("clicking")}></Button>
//       <TouchableNativeFeedback onPress={() => console.log("image tapped")}>
//         <View style={{ width: 200, height: 70, backgroundColor: "red" }} />
//         {/* <Image
//           style={styles.tinyLogo}
//           blurRadius={0.2}
//           fadeDuration={1000}
//           source={{
//             uri: "https://picsum.photos/200",
//           }}
//         /> */}
//       </TouchableNativeFeedback>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#333",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "#bbb",
//   },
//   tinyLogo: {
//     width: 300,
//     height: 200,
//   },
// });
