import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { db } from "../firebase/config";

class Usuarios extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
      todosUsuarios: [],
      isLoading: true,
      userField: "",
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let usuarios = [];
      docs.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        usuarios: usuarios,
        todosUsuarios: usuarios,
        isLoading: false,
      });
    });
  }
  handleFilter(text) {
    const filteredUsers = this.state.todosUsuarios.filter(
      (usuario) => usuario.data.username.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ usuarios: filteredUsers });
  }
  render() {
    return (
      <View style={styles.principal}>
        {this.state.isLoading ? (
          <View style={styles.cargandoConte}>
            <ActivityIndicator
              style={styles.cargando}
              size="large"
              color="#cfe2f3"
            />
          </View>
        ) : (
          <>
            <Text style={styles.titulo}>Nombres:</Text>
            <FlatList
              data={this.state.usuarios}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => 
                <View style={styles.lista}>
                  <Text style={styles.items}>{item.data.username}</Text>
                </View>
              }
            />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Buscar username"
          value={this.state.userField}
          onChangeText={(text) => {
            this.setState({ userField: text });
            this.handleFilter(text);
          }}
        />
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
  cargandoConte: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  cargando: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#ffffff",
    padding: 15,
  },
  titulo:{
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff", 
    marginVertical: 5,
  },
  lista: {
    backgroundColor: "#cfe2f3",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  items: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Usuarios;
