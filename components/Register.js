import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    Thumbnail
} from 'native-base';

import firebase from './../firebase';

import { useNavigation } from '@react-navigation/native'

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const submit = () => {
        Alert.alert(
            'Desea registrarse con este correo',
            'Este correo le servira para navegar dentro de la app',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        try {
                            await firebase.user.createUserWithEmailAndPassword(email, password)
                                .then((res) => firebase.user.currentUser.sendEmailVerification().then(function () {
                                    console.log("Correo de verificación enviado")
                                    navigation.navigate("Login")
                                }, function (error) {
                                    console.log("Correo no enviado" + error)
                                }))
                                .catch((res) => alert('Contrasena debe tener mas de 6 caracteres'));



                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        )

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
                        onPress={() => submit()}
                    >
                        <Text style={styles.btnText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
})

export default Register;