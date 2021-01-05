import React, { useContext } from 'react';
import {
    Container,
    Text,
    Button,
    View, 
    Thumbnail
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';
import firebase from '../../firebase';

import ReservaContext from '../../context/reservas/reservasContext';

const InicioReserva = () => {

    const { reservacion } = useContext(ReservaContext);

    const navigation = useNavigation();
    
    if (firebase.user.currentUser){
        if(!reservacion){
            return (
            
                <Container style={globalStyles.contenedor}>
                    <Thumbnail
                        style={styles.logo} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c' }} 
                    />
                    <View style={[styles.separadorBoton, styles.contenido]}>
                        <Button
                            onPress={() => navigation.navigate('FormularioReserva')}
                            style={[globalStyles.boton, styles.separadorTexto]}
                            full
                        >
                            <Text style={globalStyles.botonTexto}>Hacer una reserva</Text>
                        </Button>
                        <Button
                            onPress={() => navigation.navigate('ConsultaReserva')}
                            style={[globalStyles.boton, styles.separadorTexto]}
                            full
                        >
                            <Text style={globalStyles.botonTexto}>Ver Reserva</Text>
                        </Button>     
                    </View>
                    <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
                </Container>
            )    
        }else{
            return (
            
                <Container style={globalStyles.contenedor}>
                    <Thumbnail
                        style={styles.logo} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c' }} 
                    />
                    <View style={[styles.separadorBoton, styles.contenido]}>
                        <Button
                            onPress={() => navigation.navigate('ConsultaReserva')}
                            style={[globalStyles.boton, styles.separadorTexto]}
                            full
                        >
                            <Text style={globalStyles.botonTexto}>Ver Reserva</Text>
                        </Button>     
                    </View>
                    <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
                </Container>
            );
        }
    }
    else{
        return(
            <Container style={globalStyles.contenedor}>
                <Thumbnail
                    style={styles.logo} 
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c' }} 
                />
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
            <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />
        </Container>
        )
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
})

export default InicioReserva;
