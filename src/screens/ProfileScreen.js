import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Button,
  ScrollView,
  RefreshControl
} from 'react-native';
import { ListItem, Rating } from 'react-native-elements'
//import Config from '../constants/Config';
//import Loader from '../components/Loader';
import moment from 'moment';


export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            userId: "",
            userName: "",
            userEmail: "",
            userToken: "",
            user: {},
            comentario: "Mis Géneros Favoritos :",
            movies: null,
            loading: false,
            showChangePw: "",
            newPw: "",
            modalVisible: false
        }

        this.fetchData = this.fetchData.bind(this)
    }

    /*
    static navigationOptions = ({ navigation }) => {
      return {
        title: `My Profile`,
        headerStyle: {
          backgroundColor: '#0099ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      };
    };
*/
    componentDidMount(){
        this.getData(this.fetchData);
    }
    
    _onRefresh = () => {//Get comments again when refreshing page.
      this.setState({refreshing: true});
      this.getData(this.fetchData).then(() => {
        this.setState({refreshing: false});
      });
    }


    getData = async (cb) => { //Get user token for security and call fetchData as callback.
        const storageValue = await AsyncStorage.getItem('@user');
        const storageValueJson = JSON.parse(storageValue);
        if(storageValue !== null) {
          this.setState({
              userId: storageValueJson.id,
              userName: storageValueJson.name,
              userEmail: storageValueJson.email,
              userToken: storageValueJson.token,
              user: storageValueJson
            }, cb)
        }
    }

    fetchData(){ // Fetch comments done by user logged.
        this.setState({loading: true});
        const endpoint_back_movies = `${Config.api_url}/getCommentsbyField`;
        fetch(endpoint_back_movies,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.state.userToken}`
                }
            }
        ).then(
            (response) => {
                return response.json();
            }
        ).then(responseDataBack => {
            const results = responseDataBack.comments;
            var movies = [];

            let movies_titles = Object.keys(results);

                movies_titles.forEach(movie_title => {
                    let movie_comments = results[movie_title]
                    const movieComment =(
                    <View key={movie_title} style={{margin:10}}>
                        <Text 
                            style={{fontWeight:"bold", fontSize:18, color: "#00BFFF", textDecorationLine: 'underline'}}
                            
                        >
                            {movie_title}
                        </Text>
                        {movie_comments.map(item => <ListItem
                            key={item.id}
                            title={item.comment}
                            subtitle={moment(item.date).fromNow()}
                            rightAvatar = {<Rating startingValue={item.stars} imageSize={12} readonly/>}
                        /> )   }
                    </View>)

                    movies.push(movieComment);
                })                 

            this.setState({movies: movies, loading:false});
       });
    } 

    goTochangePw(){
      this.props.navigation.navigate('ChangePassword', {user: this.state.user});
    }

    goTochangeGeners(){
      this.props.navigation.navigate('HomeScreen');
    }

    goToMyList(){
      this.props.navigation.navigate('HomeScreen');
    }

    


  render() {
    
   // let no_img = require ("../assets/images/icon.png");
    //let data = this.state.user.full_contact_data;

    /*return (
      /*Nuevo */ 
      const { navigation } = this.props; 
    return (
      /*
      <Block safe flex>
        <NavBar
          title="Galio Components"
          right={(
            <Button
              onlyIcon
              icon="heart"
              iconFamily="font-awesome"
              iconSize={theme.SIZES.BASE}
              iconColor={theme.COLORS.ICON}
              color="transparent"
              onPress={() => Linking.openURL('https://galio.io')}
            />
          )}
          left={(
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon 
                name="menu"
                family="feather"
                size={theme.SIZES.BASE}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          )}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        </Block> 

       Fin */
      <ScrollView 
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
        }
        > 
      
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={styles.email}>{this.state.user.email}</Text>
          </View>
        </View>
        
        <Text style={{fontWeight:"bold", fontSize:16, marginLeft:5, marginBottom:10}}>{this.state.comentario}</Text>
        <View>{this.state.movies}</View> 

        {/* Change pw and cahge generes favorites buttons */}
        <View style={{marginBottom:20}}>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{marginBottom: 10}}
            onPress={this.goTochangePw.bind(this)}
            title='Cambiar Contraseña'
          />
        </View>
        <View style={{marginBottom:20}}>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{ marginBottom: 10}}
            onPress={this.goTochangeGeners.bind(this)}
            title='Modificar géneros favoritos'
           />
        </View>

        <View style={{marginBottom:20}}>
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{ marginBottom: 10}}
            onPress={this.goToMyList.bind(this)}
            title='Ver mis listas '
           />
        </View>
       
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
  header:{
    backgroundColor: "#0099ff",
    height:65,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 53,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:5,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:20,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  email:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10,
    textDecorationLine: 'underline'
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  }
});