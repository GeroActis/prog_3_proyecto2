import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import AntDesign from '@expo/vector-icons/AntDesign';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            postInfo: props.postInfo,
            liked: false,
            cantLikes: props.postInfo.data.likes ? props.postInfo.data.likes.length : 0
        }
    }

    componentDidMount(){
        if (this.props.postInfo.data.likes && this.props.postInfo.data.likes.includes(auth.currentUser.email)){
            this.setState({
                liked: true
            });
        }
    }

    like(){
        db.collection("posts").doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: true,
                cantLikes: this.props.postInfo.data.likes.length
            })
        })
    }
    unLike(){
        db.collection("posts").doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                liked: false,
                cantLikes: this.props.postInfo.data.likes.length
            })
        })
    }
    

    render(){
    return(
        <View style={styles.lista}>
        <Text style={styles.items}>El usuario {this.props.postInfo.data.email} posteo: </Text>  
        <Text>{this.props.postInfo.data.post}</Text>
        <Text>{new Date(this.props.postInfo.data.createdAt).toLocaleString()}</Text>
        {
            this.state.liked ?  (
                <TouchableOpacity style={styles.likeBoton} onPress={()=> this.unLike()}>
                    <AntDesign style={styles.likeIcono} name="like1" size={24} color="black" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.likeBoton} onPress={()=> this.like()}>
                    <AntDesign style={styles.likeIcono} name="like2" size={24} color="black" />
                </TouchableOpacity>
            )
        }
        <Text>Cantidad de likes: {this.state.cantLikes}</Text>
        </View>
    )
}
}

const styles = StyleSheet.create({
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
    likeBoton: {
        marginTop: 10,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcono: {
        marginRight: 8,
    },
})

export default Post