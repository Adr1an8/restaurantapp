import React, { useState, useContext, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import globalStyles from '../styles/global';

import {
    Thumbnail,
    Button
} from 'native-base';

import firebase from './../firebase';

import { useNavigation } from '@react-navigation/native';

import  UserContext from '../context/user/userContext';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    
    const { user, obtenerUsuarios } = useContext(UserContext);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const CorreoUsuarios = user.map((usuario) =>{
        const correo  = usuario.correo;
        return correo;
    });

    const login = async () => {
        await firebase.user.signInWithEmailAndPassword(email,password)
        .then(function(res) {
            alert('Ingresado Correctamente');

            if(CorreoUsuarios.includes(email)){
                navigation.navigate("InicioMeseros");
            }else{
                navigation.navigate("NuevaOrden");
            }            
        })
        .catch((res) => alert('Usuario no encontrado'));
        
    }

    return (
        <View>
            <Thumbnail
                style={styles.logo} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c' }} 
            />
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
                    <View style={styles.space}></View>
                </View>
                    <Button style={[ globalStyles.boton, { marginTop: 10, backgroundColor: '#000'}]}
                            rounded
                            block
                            onPress={ () => navigation.navigate("Reset") }
                        >
                            <Text style={globalStyles.botonTexto}>Olvido su contraseña?</Text>
                        </Button>
                <Thumbnail
                    style={styles.logoFooter} 
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                />
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
    },
    logo: {
        
        width: '100%',
        height: 200,
        marginTop: '10%'
      
    },
    logoFooter: {
        marginTop: '10%',
        paddingTop: 100,
        width: '100%',
    },
    space: {
        marginBottom: 18
    }
})

export default Login;