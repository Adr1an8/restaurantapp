import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import {
    Container,
    Content,
    Text,
    Button,
    H1,
    View
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';

import DateTimePicker from '@react-native-community/datetimepicker';

import 'moment-timezone';
import moment from 'moment';

const FormularioReserva = (props) => {

    const initialState = {
        name: "",
        email: "",
        phone: "",
        personas: "",
        detail: "",
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
        const nowDate = moment().format('MMMM Do YYYY, h:mm:ss a');

        const validate = (email) => {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        
            return expression.test(String(email).toLowerCase())
        }

        const reservaObj = {
            nombre: state.name,
            email: state.email,
            phone: state.phone,
            personas: state.personas,
            datetime: reservDate,
            datetimenow: nowDate,
            detail: state.detail,
            activo: true,
        }

        if(reservaObj.nombre && validate(reservaObj.email) && reservaObj.phone && reservaObj.personas){
            Alert.alert("Ingresado con Exito");
            props.navigation.navigate("ResumenReserva",{saveReserva:reservaObj});
        }else if(!validate(reservaObj.email)){
            Alert.alert("Correo mal ingresado");
        }else{
            Alert.alert("Debe llenar todos los campos");
        }

    // try {
    //     const reserva = await firebase.db.collection('reservas').add(reservaObj);
    //     reservaRealizada(reserva.id);

    //     // redireccionar a progreso
        
    // } catch (error) {
         
    // }               
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
            </Content>
        </Container>
    );

    
}

const formatDate = (date, time) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
  };

export default FormularioReserva;