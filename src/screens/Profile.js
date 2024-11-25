import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      posteos: [],
    };
  }

  componentDidMount() {
    db.collection("posts")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let posteos = [];
        docs.forEach((doc) => {
          posteos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState(
          {
            posteos: posteos,
          },
          () => console.log("posteos en profile", this.state.posteos)
        );
      });
  }

  render() {
    return (
      <View style={styles.principal}>
        {this.state.posteos.length > 0 ? (
          <>
            <Text style={styles.titulo}>Mi usuario: {this.state.posteos[0].data.email}</Text>
            <Text style={styles.titulo}>Cantidad de Posteos: {this.state.posteos.length}</Text>
            <FlatList
              data={this.state.posteos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Post postInfo={item} />}
            />
          </>
        ) : (
          <Text>No hay posteos para mostrar</Text>
        )}
        <TouchableOpacity
          onPress={() => (auth.signOut(),this.props.navigation.navigate("Login"))}
        >
          <Text style={styles.deslogearse}>Desloguearse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  principal: {
      flex: 1,
      backgroundColor: "#0b5394",
      paddingHorizontal: 15,
      paddingTop: 10,
  },
  titulo:{
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff", 
    marginVertical: 5,
  },
  deslogearse: {
    marginTop: 10,
    marginBottom: 15,
    color: "#e74c3c",
    fontSize: 20,
    fontWeight: "500", 
    textDecorationLine: "underline",
    textAlign: "center", 
  },
})
export default Profile;
