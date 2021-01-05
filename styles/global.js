import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1,
    },
    boton: {
        backgroundColor: '#9c4221'
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#fff'
    },
    titulo: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize: 30
    },
    subtitulo: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize: 20
    },
    imagen: {
        height: 300,
        width: '100%'
    },
    cantidad: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    reservaDetalle: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 10
    }
})

export default globalStyles;