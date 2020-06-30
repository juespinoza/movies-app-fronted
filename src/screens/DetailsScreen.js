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

import AsyncStorage from "@react-native-community/async-storage";

const { statusBarHeight } = Constants;

// galio components
import {
  Block, Text, Icon, NavBar,
} from 'galio-framework';
import theme from '../theme';

import { getMovieData } from "../controllers/TmdbController";

import { getMovieAvgbyId, getCommentsbyField} from "../controllers/CommentsController";

import MovieDetailedInfo from "../components/MovieDetailedInfo";
import CommentList from "../components/CommentList"
import CommentBox from "../components/CommentBox"

const { width, height } = Dimensions.get('screen');


export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        loadingComments: true,
        movieData: {},
        movieAvg: 0,
        commentData: [],
        userData: {},
        userLoggedIn: false
    };


    // console.log(props.route);
    const movieInfo = props.route.params.movie;

    this.getData(movieInfo.id);
    
    let asd = this.getAverage(movieInfo.id);
    let qwe = this.getComments(movieInfo.id);


    this.interval = setInterval(() => this.getComments(movieInfo.id), 4000);
    this.interval2 = setInterval(() => this.getAverage(movieInfo.id), 4000);

    //get user data from asyncstorage
    this.checkUserSignedIn();

    //get user data from asyncstorage
    // AsyncStorage.getItem("@user").then((value) => {
    //   this.setState({userData: value});
    // })

  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }


  checkUserSignedIn = async () =>{
    try {
       let value = await AsyncStorage.getItem("@user");
       console.log("USER DATA: " + value);
       if (value != null){
        console.log("LOGGED IN IN DETAILS");
        this.setState({userData: value, userLoggedIn: true});
        
       }
       else {
        console.log("NOT LOGGED IN DETAILS");
        this.setState({userLoggedIn:false});
        console.log(this.state.userLoggedIn);
      }
    } catch (error) {
      console.log("ERROR GETTING USER DATA");
    }
  }

  getData = async (movieId) => {
    // getMovieData(movieId).then ((response) => {
    //   console.log(response);
    //   this.setState({loading:false,movieData: response});
    // });

    const url ="https://api.themoviedb.org/3/movie/";
    const id= `${movieId}`;
    const apiKEY="af158ebf42ce4f8e554bcd0ba82df8dc";

    const endpoint = `${url}${id}?api_key=${apiKEY}`;
    console.log(endpoint)
    setTimeout(() => {
      // console.log('Obteniendo toda la informacion de la Pelicula/Serie');
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

    }, 400)

  }

  getAverage = async (movieId) => {
    this.setState({loadingComments: true});
    console.log("PROMEDIO");
    let result = await getMovieAvgbyId(movieId);
    // console.log(result);
    this.setState({ movieAvg: result.avgTotal, loadingComments: false });
  }

  getComments = async (movieId) => {
    this.setState({loadingComments: true});
    let result = await getCommentsbyField("movieId",movieId);
    // console.log(result);
    this.setState({ commentData: result, loadingComments: false });
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
        <ScrollView style={styles.container}>
        <Image
          source={{ uri: bgImage }}
          resizeMode="cover"
          style={{
            width,
            height: height * 0.30,
          }}
        />
        <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>

          <Block flex style={styles.header}>
            <Block>
              <Text size={theme.SIZES.BASE * 1.875}>{movieInfo.title}</Text>

            </Block>

            
            <ScrollView>
              {this.state.loading ? (
                <Text>Cargando informacion....</Text>
                ) : (
                  <>
                  <MovieDetailedInfo item={this.state.movieData} stars={this.state.movieAvg} />
                  <CommentBox userLoggedIn={this.state.userLoggedIn} userData={this.state.userData} movieId={this.state.movieData.id} />
                  <CommentList commentData={this.state.commentData}/>
                  </>
              )}
              
                
              
            </ScrollView>
          </Block> 

        </Block>
        </ScrollView>

      </Block>
      
      )
    };
  }



const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 0.5,
    paddingHorizontal: theme.SIZES.BASE * 1.25,
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
  container: {
    flex: 0,
  },
});

