import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
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
    const progresoPedido = () => {

        const reservDate = formatDate(date,time);
        const nowDate = moment().format('MMMM Do YYYY, h:mm:ss a');

        const reservaObj = {
            nombre: state.name,
            email: state.email,
            phone: state.phone,
            personas: state.personas,
            datetime: reservDate,
            datetimenow: nowDate,
            detail: state.detail,
            activo: true,
            cancelado: false
        }
    // try {
    //     const reserva = await firebase.db.collection('reservas').add(reservaObj);
    //     reservaRealizada(reserva.id);

    //     // redireccionar a progreso
         props.navigation.navigate("ResumenReserva",{saveReserva:reservaObj});
        
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
                    value={state.name}
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(value) => handleChangeText(value, "email")}
                    value={state.email}
                />
                <TextInput
                    placeholder="phone"
                    onChangeText={(value) => handleChangeText(value, "phone")}
                    value={state.phone}
                />
                <TextInput
                    placeholder="personas"
                    onChangeText={(value) => handleChangeText(value, "personas")}
                    value={state.personas}
                />

                {/* Datetime */}

                <View style={{ marginTop: 100 }}>
                    <TouchableOpacity onPress={showDatepicker}>
                        <Text style={{ fontSize: 50 }}>{formatDate(date, time)}</Text>
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
                    value={state.detail}
                />

                <Button
                    onPress={() => progresoPedido()}
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