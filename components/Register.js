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
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [phone, setPhone] = useState('');
    const [names, setNames] = useState('');
    const [identification, setIdentification] = useState('');
    const [address, setAddress] = useState('');

    const navigation = useNavigation();

    const submit = () => {
        Alert.alert(
            'Desea registrarse con este correo',
            'Este correo le servirá para navegar dentro de la app.',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        if(password == passwordConfirmation){
                            // Validar cédula, pasaporte
                            // Validar teléfono
                            try {
                                await firebase.user.createUserWithEmailAndPassword(email, password)
                                    .then((res) => firebase.user.currentUser.sendEmailVerification().then(function () {
                                        console.log("Correo de verificación enviado")

                                        console.log(res.user.uid);

                                        // const usuarioObj = {
                                        //     uid: res.user.uid,
                                        //     identificacion: identification,
                                        //     correo: email,
                                        //     nombre: names,
                                        //     telefono: phone,
                                        //     direccion: address,
                                        //     rol: 'Usuario',
                                        //     existencia: false
                                        // }

                                        try{
                                            const usuario = firebase.db.collection('usuarios').doc(res.user.uid).set({
                                                identificacion: identification,
                                                correo: email,
                                                nombre: names,
                                                telefono: phone,
                                                direccion: address,
                                                rol: 'Cliente',
                                                existencia: true
                                            });
                                            console.log(usuario);
                                        }catch(error){
                                            console.log(error);
                                        }

                                        navigation.navigate("Login")
                                  }, function (error) {
                                        console.log("Correo no enviado" + error)
                                  }))
                                  .catch((res) => alert(res));
                            } catch (error) {
                                console.log(error);
                            }           
                        }else{
                            Alert.alert('Error','Las contraseñas deben ser iguales.');
                        }   
                    }
                }
            ]
        )

    }

    // const validarCedula = cedula => {
    //     var cad = cedula.trim();
    //     var total = 0;
    //     var longitud = cad.length;
    //     var longcheck = longitud - 1;

    //     if (cad !== "" && longitud === 10){
    //       for(i = 0; i < longcheck; i++){
    //         if (i%2 === 0) {
    //           var aux = cad.charAt(i) * 2;
    //           if (aux > 9) aux -= 9;
    //           total += aux;
    //         } else {
    //           total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
    //         }
    //       }

    //       total = total % 10 ? 10 - total % 10 : 0;

    //       if (cad.charAt(longitud-1) == total) {
    //         Alert.alert("Cedula Válida");
    //       }else{
    //         Alert.alert("Cedula Inválida");
    //       }
    //     }
    // }

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
                    placeholder="Correo electrónico"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    type="password"
                    id="password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    type="password"
                    id="passwordConfirmation"
                    onChangeText={text => setPasswordConfirmation(text)}
                    value={passwordConfirmation}
                />
                <TextInput
                    style={styles.input}
                    type="names"
                    id="names"
                    placeholder="Nombres"
                    onChangeText={text => setNames(text)}
                    value={names}
                />
                <TextInput
                    style={styles.input}
                    type="identification"
                    id="identification"
                    placeholder="Identificación"
                    onChangeText={text => setIdentification(text)}
                    value={identification}
                />
                <TextInput
                    style={styles.input}
                    type="phone"
                    id="phone"
                    placeholder="Teléfono"
                    onChangeText={text => setPhone(text)}
                    value={phone}
                />       
                <TextInput
                    style={styles.input}
                    type="address"
                    id="address"
                    placeholder="Dirección"
                    onChangeText={text => setAddress(text)}
                    value={address}
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