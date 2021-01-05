import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Text, Thumbnail } from 'native-base';
import globalStyles from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

const NuevaOrden = () => {

    const navigation = useNavigation();

    return ( 
        <Container style={globalStyles.contenedor}>
            <Thumbnail
                    style={styles.logo} 
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c' }} 
                />
            <View style={[styles.separadorBoton, styles.contenido]}>
                <Button
                    style={[globalStyles.boton,styles.separadorTexto]}
                    rounded
                    block
                    onPress={ () => navigation.navigate('MenuMeseros')  }
                >
                    <Text style={globalStyles.botonTexto}>Tomar Orden</Text>
                </Button>
                <Button
                    style={[globalStyles.boton,styles.separadorTexto]}
                    rounded
                    block
                    onPress={ () => navigation.navigate('VerOrdenesMeseros')  }
                >
                    <Text style={globalStyles.botonTexto}>Ver Ordenes Generales</Text>
                </Button>
            </View>
            <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />
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
    separadorBoton: {
        marginTop: 20
    },
})
 
export default NuevaOrden;