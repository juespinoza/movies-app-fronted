import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

// galio components
import {
  Block, Card, Text, Icon, NavBar,
} from 'galio-framework';
import theme from '../theme';

const { width, height } = Dimensions.get('screen');


export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        movieData: {
        }
    };
    console.log(props.route);
    const movieInfo = props.route.params.movie;
    this.getData(movieInfo.id);
  }

  getData(movieId){

    const url ="https://api.themoviedb.org/3/movie/";
    const id= `${movieId}`;
    const apiKEY="af158ebf42ce4f8e554bcd0ba82df8dc";

    const endpoint = `${url}${id}?api_key=${apiKEY}`;
    console.log(endpoint)
    setTimeout(() => {
      console.log('Obteniendo toda la informacion de la Pelicula/Serie');
      this.setState({
        loading: true,
      })
      fetch(endpoint
        ).then ((response) => {
               
            return response.json();
        }).then (responseData => {
          this.setState({
            loading: false,
            movieData: responseData
          });
          console.log(responseData);  
        });

    }, 5000)
  }


  render() {
    let movieInfo = this.props.route.params.movie;
    let bgImage = movieInfo.imageUrl;
    

    return (
      <Block>
        <StatusBar barStyle="light-content" />
        <Block style={styles.navbar}>
          <NavBar transparent left={(
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                  <Icon 
                    name="menu"
                    family="feather"
                    size={theme.SIZES.BASE}
                    color={theme.COLORS.WHITE}
                  />
                </TouchableOpacity>
              )} />
        </Block>

        <Image
          source={{ uri: bgImage }}
          resizeMode="cover"
          style={{
            width,
            height: height * 0.55,
          }}
        />
        <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
          <Block flex style={styles.header}>
            <Block>
              <Text size={theme.SIZES.BASE * 1.875}>{movieInfo.title}</Text>
              <Text muted t size={theme.SIZES.BASE * 0.875} style={{ marginTop: theme.SIZES.BASE, fontWeight: '500' }}>
                Idioma Original: {movieInfo.lang}
              </Text>
            </Block>

            <Block center>
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
            </Block>
            <ScrollView>
              <Text style={styles.text}>
                {movieInfo.overview}
              </Text>
              <Text style={styles.text}>
                {this.state.loading ? (
                  <Text>Cargando informacion....</Text>
                ) : (
                  this.state.movieData.belongs_to_collection? (
                  this.state.movieData.belongs_to_collection.name
                  ):("Sin datos")
                )}
              </Text>
              
                {this.state.loading ? (
                    <Text>Cargando informacion....</Text>
                  ) : (
                    <Block>
                    {this.state.movieData.genres.map((data) => {
                      return (
                        <Block key={data.id}>
                        <Icon name="heart" family="font-awesome" color={theme.COLORS.MUTED} size={theme.SIZES.FONT * 0.875} />
                        <Text
                          p
                          color={theme.COLORS.MUTED}
                          size={theme.SIZES.FONT * 0.875}
                          style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                        >
                            {data.name}
                        </Text>
                        </Block>
                      )
                    }
                    )
                    }
                    </Block>
                  )
                }

                

            </ScrollView>
          </Block> 

        </Block>

      </Block>
      
      )
    };
  }



const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

