import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
 
import Pdf from 'react-native-pdf';
 
const TerminosCondiciones = () => {

    const source = {uri:'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/terminos-condiciones-app_Campina_Lojana.pdf?alt=media&token=b3608652-78e6-4d52-800e-49bd00b47400',cache:true};

    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                onPressLink={(uri)=>{
                    console.log(`Link presse: ${uri}`)
                }}
                style={styles.pdf}/> 
        </View>
    )

}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default TerminosCondiciones;