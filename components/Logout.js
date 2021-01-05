import React from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

import { Button } from 'native-base';
import globalStyles from '../styles/global';

import firebase from './../firebase';

import { useNavigation } from '@react-navigation/native'

const Logout = (props) => {

    const navigation = useNavigation();

    const logout = async () => {
        await firebase.user.signOut()
            .then((res) => alert('A salido correctamente'));

        navigation.navigate("Principal");

    }

    // var currentUser = firebase.user.currentUser;
    // console.log(currentUser);

    return (
        <View>
            <View>
                <Text style={globalStyles.titulo} >¿Desea salir?</Text> 
                <Button
                    style={[globalStyles.boton, styles.separadorBoton]}
                    rounded
                    block
                    onPress={() => logout()}
                >
                    <Text style={globalStyles.botonTexto}>Cerrar Sesion</Text>
                </Button>
            </View>
                <Button
                    style={globalStyles.boton}
                    rounded
                    block
                    onPress={() => navigation.navigate('Principal')}
                >
                    <Text style={globalStyles.botonTexto}>Regresar</Text>
                </Button>
            
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
    separadorBoton: {
        marginTop: 5,
        marginBottom: 5
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

export default Logout;