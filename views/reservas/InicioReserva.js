import React from 'react';
import {
    Container,
    Text,
    Button,
    View
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';
import firebase from '../../firebase';


const InicioReserva = (props) => {

    const navigation = useNavigation();
    
    if (firebase.user.currentUser){
        return (
            
            <Container style={globalStyles.contenedor}>
                <View style={[globalStyles.contenido, styles.contenido]}>
                    <Button
                        onPress={() => navigation.navigate('FormularioReserva')}
                        style={[globalStyles.boton, styles.separadorTexto]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Hacer una reserva</Text>
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('ResumenReserva')}
                        style={[globalStyles.boton, styles.separadorTexto]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Ver Reserva</Text>
                    </Button>     
                </View>
            </Container>
        );
    }
    else{
        return(
            <Container style={globalStyles.contenedor}>
            <View style={globalStyles.contenido}>
                <Text style={[globalStyles.subtitulo]}>Para realizar una reserva debe iniciar sesión</Text>
                <Button
                    style={globalStyles.boton}
                    rounded
                    block
                    onPress={ () => navigation.navigate('Login')  }
                >
                    <Text style={globalStyles.botonTexto}>Login</Text>
                </Button>
            </View>
        </Container>
        )
    }

    
}

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    separadorTexto: {
        marginTop: 10
    }
})

export default InicioReserva;
