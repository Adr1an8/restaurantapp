import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import firebase from './../firebase';

import { useNavigation } from '@react-navigation/native'



const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const login = async () => {
        await firebase.user.signInWithEmailAndPassword(email,password)
        .then(function(res) {
            alert('Ingresado Correctamente');
            navigation.navigate("NuevaOrden");
        })
        .catch((res) => alert('Usuario no encontrado'));
        

    }

    // var userLog;
    // firebase.user.onAuthStateChanged(function(user) {
    //     if (user) {
    //       userLog = true;
    //       navigation.navigate("Logout");
    //     } else {
    //       userLog = false;
    //     }
    //    console.log(userLog);
    //   });
    

    return (
        <View>
                <View>
                    <TextInput
                        style={styles.input}
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        type="password"
                        id="password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.userBtn}
                            onPress={() => login()}
                        >
                            <Text style={styles.btnText}>Ingresar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.userBtn}
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={styles.btnText}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff00'
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        color: '#000',
        margin: 10,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    userBtn: {
        backgroundColor: '#000',
        padding: 15,
        width: '45%',
        left: '50%',
    },
    btnText: {
        fontSize: 18,
        textAlign: 'center',
        color: "#fff"
    },
    btnCerrarSesion: {
        color: '#000',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

export default Login;