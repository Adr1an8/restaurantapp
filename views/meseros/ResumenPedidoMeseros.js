import React, {  useContext, useEffect, useState } from 'react';
import {  Alert, TextInput } from 'react-native';
import {
    Container,
    Content, 
    List,
    ListItem,
    Thumbnail, 
    Text,
    Left, 
    Body,
    Button,
    H1, 
    Footer, 
    FooterTab
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';
import firebase from '../../firebase';

import PedidoContext from '../../context/pedidos/pedidosContext';

import 'moment-timezone';
import moment from 'moment';

const ResumenPedido = () => {

    const navigation = useNavigation();

    const initialState = {
        mesa: "",
        arrayIdProductos: []
    }

    // context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

    const [state, setState] = useState(initialState);

    //state para obtener los productos
    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        calcularTotal();
        firebase.db.collection("productos").onSnapshot((querySnapshot) => {
            const productos = [];
            querySnapshot.docs.forEach((doc) => {
              const { cantidad, nombre } = doc.data();
              productos.push({
                id: doc.id,
                nombre,
                cantidad,
              });
            });
            setProductos(productos);
        });
        
    }, [pedido]);

    const actualizarCantidadProductos = async () =>{
        const arrayIdProdcutos = [];
        let suma = 0;
        let arregloCantidadElegida = [];
        for(let i=0; i<pedido.length; i++){
            const productoPedido = pedido.map(x => x.productos)[i];
            for(let j=0; j<productos.length; j++){
                if(productoPedido.includes(productos[j].nombre)){
                    arregloCantidadElegida.push(pedido.map(x => x.cantidad)[i]);
                    arrayIdProdcutos.push(productos[j].id);
                    suma++;
                }
            }
        }

        for(let k=0; k<suma; k++){
            try {
                const dbRef = firebase.db.collection('productos').doc(arrayIdProdcutos[k])
                const doc = await dbRef.get();
                const cantidadBase = doc.data().cantidad;

                const cantidadARestar = arregloCantidadElegida[k];
                let nuevoTotal = cantidadBase - cantidadARestar;

                const update = await dbRef.update({
                    cantidad: nuevoTotal
                })
                
                } catch (error) {
                    console.log(error);
                }  
        }

    }

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce( (nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);

        mostrarResumen(nuevoTotal)

    }

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    // redirecciona a Progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        const dateNow = moment().format();

                        // crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            cancelado: true,
                            pendienteDespacho: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: dateNow,
                            mesa: state.mesa
                        }

                        if(!pedidoObj.mesa){
                            Alert.alert("Debe ingresar una mesa");
                        }else if (pedidoObj.mesa > 25 ){
                            Alert.alert("Solo existen 25 mesas");
                        }else{
                            try {
                                const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                                pedidoRealizado(pedido.id);

                                actualizarCantidadProductos();
                                navigation.navigate("InicioMeseros")

                            } catch (error) {
                                console.log(error);
                            }
                        }

                      
                    }
                }, 
                { text: 'Revisar', style: 'cancel'}
            ]
        )
    }

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id);
                    }
                }, 
                { text: 'Cancelar', style: 'cancel'}
            ]
        )
    }

    return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pediddo</H1>
                {pedido.map( (platillo, i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo;
                    return( 
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: imagen}} />
                                </Left>

                                <Body>
                                    <Text>{nombre} </Text>
                                    <Text>Cantidad: {cantidad} </Text>
                                    <Text>Precio: $ {precio} </Text>

                                    <Button
                                        onPress={ () => confirmarEliminacion(id) }
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>
                <TextInput
                    placeholder="Ingrese el numero de mesa!"
                    style={{fontWeight: 'bold', fontSize: 20}}
                    onChangeText={(value) => handleChangeText(value, "mesa")}
                    keyboardType="numeric"
                    maxLength={3}
                    value={state.mesa}
                />
                <Button
                    onPress={ () => navigation.navigate('MenuMeseros') }
                    style={ {marginTop: 30}}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => progresoPedido()  }
                        style={[globalStyles.boton ]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
     );
}
 
export default ResumenPedido;