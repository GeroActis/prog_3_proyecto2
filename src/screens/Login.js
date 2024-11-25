import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            esvalido: false,
            errorMessage: ''
        };
    }

    validarForm = () => {
        const { email, password } = this.state;
        this.setState({ esvalido: email && password });
    };
  
    
    handleLogin = () => {
      const { email, password } = this.state;
  
      auth.signInWithEmailAndPassword(email, password)
          .then(response => {
              this.setState({ errorMessage: '', registered: true });
              this.props.navigation.navigate('HomeMenu'); 
          })
          .catch(error => {
              this.setState({ errorMessage: 'Datos incorrectos, intente nuevamente.' });
          })
  }
  
    render() {
        return (
            <View style={styles.container}>
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
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => {
                        this.setState({ password: text }, this.validarForm);
                    }}
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: this.state.esvalido ? '#007bff' : '#ccc' }]}
                    onPress={this.handleLogin}
                    disabled={!this.state.esvalido}
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
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
        backgroundColor: '#f5f5f5',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    link: {
        marginTop: 20,
        color: '#007bff',
        fontSize: 16,
        fontWeight: '500',
    },
    errorText: {
        color: '#e74c3c',
        marginBottom: 15,
        fontSize: 14,
    }
});

export default Login;
