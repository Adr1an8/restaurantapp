import React, { useEffect, useState } from 'react';
import {
    Container,
    Content,
    Text,
    Button,
    Thumbnail,
    Footer,
    FooterTab
} from 'native-base';
import { StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';
import firebase from '../../firebase';

const PerfilUsuario = () => {

    const navigation = useNavigation();

    const [ identification, setIdentification] = useState('');
    const [ names, setNames] = useState('');
    const [ phone, setPhone] = useState('');
    const [ address, setAddress] = useState('');
    const [ localUid, setLocalUid] = useState('');

    useEffect(() => {
        const uid = firebase.user.currentUser.uid;

        if(uid != undefined){
            const obtenerPerfil = () => {
                firebase.db.collection('usuarios')
                            .doc(uid)
                            .onSnapshot(function(doc) {
                                setIdentification(doc.data().identificacion);
                                setNames(doc.data().nombre);
                                setPhone(doc.data().telefono);
                                setAddress(doc.data().direccion);
                            })

                setLocalUid(uid)
            }
    
            obtenerPerfil()
        }   
    }, []);

    const submit = () => {
        Alert.alert(
            'Desea actualizar su información personal.',
            'Esta información será usada para la generación de sus facturas.',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {                                                    
                            try {                                  
                                firebase.db
                                    .collection('usuarios')
                                    .doc(localUid).update({
                                        identificacion: identification,
                                        nombre: names,
                                        telefono: phone,
                                        direccion: address
                                    });

                                //navigation.navigate("Login")
                            } catch (error) {
                                Alert.alert("Algo salio mal" + error);
                            }           
                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )
    }

    if (firebase.user.currentUser){
        return (
            <Container style={globalStyles.contenedor}>
                <Content style={globalStyles.contenido}>
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
                        type="names"
                        id="names"
                        placeholder="Nombres"
                        onChangeText={text => setNames(text)}
                        value={names}
                        maxLength={30}
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
                <Text style={globalStyles.botonTexto}>Actualizar datos</Text>
                </Button>
                <Thumbnail
                    style={styles.logoFooter} 
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                />
            </Container>
        );
    }    
}

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    separadorBoton: {
        marginTop: 20
    },
    separadorTexto: {
        marginTop: 10
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
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
})

export default PerfilUsuario;