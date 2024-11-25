import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
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
      <View>
        {this.state.posteos.length > 0 ? (
          <>
            <Text>Mi usuario: {this.state.posteos[0].data.email}</Text>
            <Text>Cantidad de Posteos: {this.state.posteos.length}</Text>
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
          <Text>Desloguearse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;
