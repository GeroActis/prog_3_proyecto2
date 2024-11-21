import React, {Component} from "react";
import Post from "../components/Post";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../firebase/config";

class Home extends Component{
    constructor(){
        super();
        this.state = {
            posteos: [],
            isLoading: true
        }
    }

    componentDidMount(){
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                this.setState({
                    posteos: posteos,
                    isLoading: false
                })
                
            }
        )
    }

    render(){
        return(
        <View style={styles.principal}>
            {this.state.isLoading ? (
                <View style={styles.cargandoConte}>
                <ActivityIndicator style={styles.cargando} size="large" color="#cfe2f3" />
                </View>
                ) : (
                <FlatList 
                data={this.state.posteos}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <Post postInfo={item}/>}
            />)}
        </View>
    )
}
}
const styles = StyleSheet.create({
    principal: {
        flex: 1,
        backgroundColor: "#0b5394",
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    cargandoConte:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 20
    },
    cargando:{
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "#ffffff",
        padding: 15
    }
})

export default Home