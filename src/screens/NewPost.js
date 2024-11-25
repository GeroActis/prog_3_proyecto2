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
        backgroundColor: "#cfe2f3",
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
        borderColor: "#6fa8dc",
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "#ffffff",
        color: "#0b5394",
        textAlignVertical: "top",
    },
    boton: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: "#0b5394",
    },
    textoBoton: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "600",
    },
});


export default NewPost