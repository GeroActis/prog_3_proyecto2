import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            esvalido: false,
            errorMessage: ''
        };
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate("HomeMenu")
            }
        })
    }

    validarForm = () => {
        const { email, username, password } = this.state;
        this.setState({ esvalido: email && username && password });
    };

    handleRegister = () => {
        const { email, username, password } = this.state;

        auth.createUserWithEmailAndPassword(email, password)
            .then(userData => {
                const user = userData.user;

                db.collection("users").doc(user.uid).set({
                    username: username,
                    email: email
                })
                .then(() => {
                    this.setState({ errorMessage: '' });
                    this.props.navigation.navigate('Login');
                })
                .catch(() => {
                    this.setState({ errorMessage: 'Error al guardar en Firestore.' });
                });
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
            });
    };

    render() {
        return (
            <View style={styles.container}>

                <Image source={require('../../assets/logo.png')} resizeMode="contain" style={styles.logo}/>

                {this.state.errorMessage ? <Text style={styles.errorText}>{this.state.errorMessage}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(text) => {
                        this.setState({ email: text }, this.validarForm);
                    }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    value={this.state.username}
                    onChangeText={(text) => {
                        this.setState({ username: text }, this.validarForm);
                    }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => {
                        this.setState({ password: text }, this.validarForm);
                    }}
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: this.state.esvalido ? '#007bff' : '#ccc' }]}
                    onPress={this.handleRegister}
                    disabled={!this.state.esvalido}
                >
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.link}>¿Ya tenés cuenta? Inicia sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#cfe2f3', 
    },
    logo: {
        width: 300, 
        height: 300, 
        marginBottom: 20, 
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#6fa8dc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#ffffff',
        color: '#0b5394',
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: '#3d85c6',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    link: {
        marginTop: 20,
        color: '#0b5394',
        fontSize: 16,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: '#e74c3c',
        marginBottom: 15,
        fontSize: 14,
    },
});


export default Register;
