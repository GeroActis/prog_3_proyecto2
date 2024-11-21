import React, { Component } from "react"
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native"
import { auth, db } from "../firebase/config";

class NewPost extends Component{
    constructor(){
        super();
        this.state = { 
            post: "",
        }
    }
    postear(email, post){
            db.collection("posts").add({
                email: email,
                post: post,
                likes: [],
                createdAt: Date.now()
            })
            .then(() => {
                this.props.navigation.navigate("Home")
            })
            .catch(error => {
                console.error("Error al subir el post:", error);
            })
    }
    render(){
    return (
        <View style={styles.contenedor}>
             <Text style={styles.titulo}>POSTEOS</Text>
             <TextInput style={styles.input} keyboardType="default" placeholder="Tu posteo..." onChangeText={ text => this.setState({post: text})} value={this.state.post}/>
             <TouchableOpacity style={styles.boton} onPress={()=> this.postear(auth.currentUser.email, this.state.post)}>
                <Text style={styles.textoBoton}>Subir</Text>
             </TouchableOpacity>
        </View>
    )
}
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        backgroundColor: "#f5f5f5",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 100,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "#fff",
        textAlignVertical: "top",
    },
    boton: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#007bff",
    },
    textoBoton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});


export default NewPost