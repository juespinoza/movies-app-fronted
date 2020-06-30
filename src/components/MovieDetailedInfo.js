import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Block, Card, Icon } from "galio-framework";

import Stars from "./Stars";

import theme from '../theme';

export default function MovieDetailedInfo({ item , stars}) {
  const language = (lang) => {
    let result = "";
    switch (lang) {
      case "en":
        result = "Inglés";
        break;
      case "es":
        result = "Español";
        break;
      default:
        result = lang;
        break;
    }
    return result;
  };

  const starCant = (cant) => {
    // var res = [];

    // for (let i = 1; i < cant; i++) {
    //   res.push(
    //     <Icon
    //       family="font-awesome"
    //       size={20}
    //       name="star"
    //     />
    //   );
    // }
    // console.log(cant%1);
    // if (cant%1 != 0) {
    //     res.push(
    //         <Icon
    //         family="font-awesome"
    //         size={20}
    //         name="star-half-empty"
    //         />
    //   );
    // }
    // for (let i = 4; i >= cant; i--) {
    //     res.push(
    //       <Icon
    //         family="font-awesome"
    //         size={20}
    //         name="star-o"
    //       />
    //     );
    // }
    // return res;
    // <Stars cant={cant}></Stars>
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Icon name="language" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 1.5} />
        <Text style={styles.titulos}>Idioma Original: </Text>
        <Text style={styles.resultado}>{language(item.original_language)}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Icon name="star" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 1.5} />
        <Text style={styles.titulos}>Puntaje TMDB:</Text>
        <Text style={styles.resultado}>{item.vote_average}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Icon name="vote" family="material-community" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 1.5} />
        <Text style={styles.titulos}>Votos:</Text>
        <Text style={styles.resultado}>{item.vote_count}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Icon name="calendar" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 1.5} />
        <Text style={styles.titulos}>Fecha de Lanzamiento:</Text>
        <Text style={styles.resultado}>{item.release_date}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Icon name="http" family="material-icons" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 1.5} />
        <Text style={styles.titulos}>Pagina Web:</Text>
        <Text style={styles.resultado}>{item.homepage}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Icon name="trophy" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 1.5 }/>
        <Text style={styles.titulos}>Calif. MovieAPP:</Text>
        <Stars key={Math.random()} cant={stars}/>
      </View>

      <View style={styles.innerContainer2}>
        <Icon name="book" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 1.5} />
        <Text style={styles.titulos}>Descripción</Text>
      </View>

      <View style={styles.description}>
        <Text style={styles.resultado}>{item.overview}</Text>
      </View>


      {/* <Block center>
              <Card
                borderless
                style={styles.stats}
                title="Christopher Moon"
                caption="139 minutes ago"
                avatar="http://i.pravatar.cc/100?id=article"
                location={(
                  <Block row right>
                    <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                      <Icon name="eye" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                      <Text
                        p
                        color={theme.COLORS.MUTED}
                        size={theme.SIZES.FONT * 0.875}
                        style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                      >
                        25.6kdd
                      </Text>
                    </Block>
                    <Block row middle>
                      <Icon name="heart" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                      <Text
                        p
                        color={theme.COLORS.MUTED}
                        size={theme.SIZES.FONT * 0.875}
                        style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                      >
                        936
                      </Text>
                    </Block>
                  </Block>
                )}
              />
            </Block> */}


    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  innerContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:20
  },
  titulos: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5
  },
  resultado: {
    fontSize: 18,
  },
  description: {
    marginTop: 5,
  },
  iconStyle: {
    color: "#D32F2F",
  },
  iconStarFilled: {
    color: "#FFB300",
  },
  stats: {
    borderWidth: 0,
    width: 400 - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
});
