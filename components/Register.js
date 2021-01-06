import React, { useState } from 'react'
import {
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import globalStyles from '../styles/global';
import {
    Thumbnail,
    Container,
    Content,
    Footer,
    FooterTab,
    Button
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
                            
                            const validate = (email) => {
                                const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                            
                                return expression.test(String(email).toLowerCase())
                            }
                            
                            try {
                                // if(identification.length != 13 || identification.length != 10 ){
                                //     Alert.alert("Ingrese un numero de cedula o ruc correcto");
                                // }else if(phone.length != 9 || phone.length != 10){
                                //     Alert.alert("Numero de telefono incorrecto");
                                // } else if(!validate(email)){
                                //     Alert.alert("Email incorrecto");
                                // } else if(!identification && !email && !names && !phone && !address){
                                //     Alert.alert("Debe llenar todos los campos");
                                // }else{
                                    await firebase.user.createUserWithEmailAndPassword(email, password)
                                    .then((res) => firebase.user.currentUser.sendEmailVerification().then(function () {
                                        
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
                                        }catch(error){
                                            console.log(error);
                                        }

                                        navigation.navigate("Login")
                                  }, function (error) {
                                    Alert.alert("Debe llenar todos los campos" + error);
                                  }))
                                  .catch((res) => alert(res));
                                // }
                            } catch (error) {
                                Alert.alert("Algo salio mal" + error);
                            }           
                        }else{
                            Alert.alert('Error','Las contraseñas deben ser iguales.');
                        }   
                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )

    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <TextInput
                    style={styles.input}
                    type="email"
                    id="email"
                    placeholder="Correo electrónico"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    maxLength={35}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    type="password"
                    id="password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    maxLength={35}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    type="password"
                    id="passwordConfirmation"
                    onChangeText={text => setPasswordConfirmation(text)}
                    value={passwordConfirmation}
                    maxLength={35}
                />
                <TextInput
                    style={styles.input}
                    type="names"
                    id="names"
                    placeholder="Nombres"
                    onChangeText={text => setNames(text)}
                    value={names}
                    maxLength={30}
                />
                <TextInput
                    style={styles.input}
                    type="identification"
                    id="identification"
                    placeholder="Identificación"
                    onChangeText={text => setIdentification(text)}
                    value={identification}
                    keyboardType="numeric"
                    maxLength={15}
                />
                <TextInput
                    style={styles.input}
                    type="phone"
                    id="phone"
                    placeholder="Teléfono"
                    onChangeText={text => setPhone(text)}
                    value={phone}
                    keyboardType="numeric"
                    maxLength={10}
                />       
                <TextInput
                    style={styles.input}
                    type="address"
                    id="address"
                    placeholder="Dirección"
                    onChangeText={text => setAddress(text)}
                    value={address}
                    maxLength={60}
                />
            </Content>
            <Button
                        onPress={ () => submit()  }
                        style={[globalStyles.boton ,{backgroundColor:'#000'}]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Registrarse</Text>
                    </Button>
            <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />
            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => navigation.navigate("Login")  }
                        style={[globalStyles.boton]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Regresar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
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
    logoFooter: {
        marginTop: '10%',
        paddingTop: 100,
        width: '100%',
    },
})

export default Register;