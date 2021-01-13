import React, { useState, useContext } from 'react';
import { TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import {
    Container,
    Content,
    Text,
    Button,
    H1,
    View,
    Thumbnail
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';

import DateTimePicker from '@react-native-community/datetimepicker';

import ReservaContext from '../../context/reservas/reservasContext';

import firebase from '../../firebase';

import 'moment-timezone';
import moment from 'moment';

const FormularioReserva = (props) => {

    //Context guardado
    const { reservacion, idreserva } = useContext(ReservaContext);

    let initialState = {
        name: "",
        email: "",
        phone: "",
        personas: "",
        detail: "",
    }

    if(reservacion){
        initialState = {
            name: reservacion.nombre,
            email: reservacion.email,
            phone: reservacion.phone,
            personas: reservacion.personas,
            detail: reservacion.detail,
        }    
    }


    const navigation = useNavigation();

    const [state, setState] = useState(initialState);

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            setShow(Platform.OS !== 'ios');
        } else {
            const selectedTime = selectedValue || new Date();
            setTime(selectedTime);
            setShow(Platform.OS === 'ios');
            setMode('date');
        }
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    // redirecciona a Progreso pedido
    const progresoReserva = () => {

        const reservDate = formatDate(date,time);
        const nowDate = moment();
        const dateNow = moment().format();
        const validate = (email) => {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        
            return expression.test(String(email).toLowerCase())
        }

        const reservaObj = {
            nombre: state.name,
            email: state.email,
            phone: state.phone,
            personas: state.personas,
            diahoraReserva: reservDate,
            diahoraPedidoReserva: dateNow,
            detail: state.detail,
            activo: true,
            pendingAprobe: false,
        }

        if(!reservaObj.nombre || !reservaObj.phone || !reservaObj.personas){
            Alert.alert("Debe llenar todos los campos");
        }else if(reservaObj.phone.length < 9 || reservaObj.phone.length > 10 ){
            Alert.alert("El telefono esta mal ingresado");
        }
        else if(reservaObj.personas > 40){
            Alert.alert("Sobrepaso el numero de personas");
        }else if(date <= nowDate){
            Alert.alert("Ingresar una fecha valida");
        }else if(!validate(reservaObj.email)){
            Alert.alert("Correo mal ingresado");
        }else{
            Alert.alert("Ingresado con Exito");
            props.navigation.navigate("ResumenReserva",{saveReserva:reservaObj});
        }             
    }
    // redirecciona a Progreso pedido
    const editarReserva = () => {

        Alert.alert(
            'Desea editar su reserva',
            'Por Favor llegar con tiempo de anticipación a su reserva',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const reservDate = formatDate(date,time);
                        const dateNow = moment().format();

                        try {
                            const reserva = await firebase.db.collection('reservas')
                            .doc(idreserva)
                            .update({
                                nombre: state.name,
                                email: state.email,
                                phone: state.phone,
                                personas: state.personas,
                                diahoraReserva: reservDate,
                                diahoraPedidoReserva: dateNow,
                                detail: state.detail,
                                activo: true,
                            })
    
                                // redireccionar a progreso
                                navigation.navigate("InicioReserva")
                            
                            } catch (error) {
                                console.log(error);
                            }    
                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )       
    }
    if(reservacion){
        return (
            <Container style={globalStyles.contenedor}>
                <Content style={globalStyles.contenido}>
                    <H1 style={globalStyles.titulo}>Formulario Reserva</H1>
                    <TextInput
                        placeholder="Name"
                        onChangeText={(value) => handleChangeText(value, "name")}
                        style={{fontWeight: 'bold'}}
                        value={state.name}
                        maxLength={30}
                    />
                    <TextInput
                        placeholder="Email"
                        onChangeText={(value) => handleChangeText(value, "email")}
                        style={{fontWeight: 'bold'}}
                        value={state.email}
                        maxLength={35}
                        
                    />
                    <TextInput
                        placeholder="phone"
                        onChangeText={(value) => handleChangeText(value, "phone")}
                        style={{fontWeight: 'bold'}}
                        keyboardType="numeric"
                        value={state.phone}
                        maxLength={10}
                    />
                    <TextInput
                        placeholder="personas"
                        onChangeText={(value) => handleChangeText(value, "personas")}
                        style={{fontWeight: 'bold'}}
                        keyboardType="numeric"
                        value={state.personas}
                        maxLength={3}
                    />
    
                    {/* Datetime */}
    
                    <View style={{ marginTop: 5 }}>
                        <TouchableOpacity onPress={showDatepicker}>
                            <Text style={{ fontSize: 30 }}>{formatDate(date, time)}</Text>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                testID='dateTimePicker'
                                timeZoneOffsetInMinutes={0}
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display='default'
                                onChange={onChange}
                            />
                        )}
                    </View>
    
                    <TextInput
                        placeholder="Comentarios adicionales"
                        multiline
                        numberOfLines={4}
                        onChangeText={(value) => handleChangeText(value, "detail")}
                        style={{fontWeight: 'bold'}}
                        maxLength={50}
                        value={state.detail}
                    />
    
                    <Button
                        onPress={() => editarReserva()}
                        style={{ marginTop: 30 }}
                        full
                        dark
                    >
                        <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>Confirmar</Text>
                    </Button>
                    <Button
                            onPress={() => navigation.navigate('ConsultaReserva')}
                            style={[globalStyles.boton]}
                            full
                        >
                            <Text style={globalStyles.botonTexto}>Cancelar</Text>
                        </Button>
                        <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
                </Content>
            </Container>
        );
    }
    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Formulario Reserva</H1>
                <TextInput
                    placeholder="Name"
                    onChangeText={(value) => handleChangeText(value, "name")}
                    style={{fontWeight: 'bold'}}
                    value={state.name}
                    maxLength={30}
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(value) => handleChangeText(value, "email")}
                    style={{fontWeight: 'bold'}}
                    value={state.email}
                    maxLength={35}
                    
                />
                <TextInput
                    placeholder="phone"
                    onChangeText={(value) => handleChangeText(value, "phone")}
                    style={{fontWeight: 'bold'}}
                    keyboardType="numeric"
                    value={state.phone}
                    maxLength={10}
                />
                <TextInput
                    placeholder="personas"
                    onChangeText={(value) => handleChangeText(value, "personas")}
                    style={{fontWeight: 'bold'}}
                    keyboardType="numeric"
                    value={state.personas}
                    maxLength={3}
                />

                {/* Datetime */}

                <View style={{ marginTop: 5 }}>
                    <TouchableOpacity onPress={showDatepicker}>
                        <Text style={{ fontSize: 30 }}>{formatDate(date, time)}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            timeZoneOffsetInMinutes={0}
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />
                    )}
                </View>

                <TextInput
                    placeholder="Comentarios adicionales"
                    multiline
                    numberOfLines={4}
                    onChangeText={(value) => handleChangeText(value, "detail")}
                    style={{fontWeight: 'bold'}}
                    maxLength={50}
                    value={state.detail}
                />

                <Button
                    onPress={() => progresoReserva()}
                    style={{ marginTop: 30 }}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>Confirmar</Text>
                </Button>
                <Button
                        onPress={() => navigation.navigate('NuevaOrden')}
                        style={[globalStyles.boton]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Cancelar</Text>
                    </Button>
                    <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
            </Content>
        </Container>
    );

    
}

const formatDate = (date, time) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
  };

  const styles = StyleSheet.create({
    logoFooter: {
        marginTop: 5,
        paddingTop: 100,
        width: '100%',
    },
})

export default FormularioReserva;