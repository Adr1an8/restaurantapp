import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

const NuevaOrden = () => {

    const navigation = useNavigation();

    return ( 
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, styles.contenido]}>
                <Button
                    style={[globalStyles.boton,styles.separadorTexto]}
                    rounded
                    block
                    onPress={ () => navigation.navigate('Menu')  }
                >
                    <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
                </Button>
                <Button
                    style={[globalStyles.boton,styles.separadorTexto]}
                    rounded
                    block
                    onPress={ () => navigation.navigate('InicioReserva')  }
                >
                    <Text style={globalStyles.botonTexto}>Reservas</Text>
                </Button>
            </View>
        </Container>
     );
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
 
export default NuevaOrden;