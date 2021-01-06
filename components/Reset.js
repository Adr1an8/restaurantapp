import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native'

import firebase from './../firebase';

import { useNavigation } from '@react-navigation/native'

const Reset = (props) => {
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const submit = () => {
        Alert.alert(
            'Reseteo de contraseña',
            'Se enviará un correo electrónico para el reseteo de su contraseña.',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        console.log(email);
                        await firebase.user.sendPasswordResetEmail(email);
                        navigation.navigate("Login")
                    }
                }
            ]
        )

    }

    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    type="email"
                    id="email"
                    placeholder="Correo electrónico"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.userBtn}
                        onPress={() => submit()}
                    >
                        <Text style={styles.btnText}>Resetear contraseña</Text>
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
        width: '100%',
        left: '33%'
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

export default Reset;