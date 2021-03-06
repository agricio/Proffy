import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 30
    },

    banner: {
        width: '100%',
        resizeMode: 'contain'
    },

    logo: {

        width: '100%',
        height: 65,
        resizeMode: 'contain', 
    },

    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 20,
        lineHeight: 25,
        marginTop: 35,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },

    button: {
        height: 100,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    buttonPrimary: {
        backgroundColor: '#9871f5'
    },

    buttonSecondary: {
        backgroundColor: '#04d361'
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 17,
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 20,
    },




});

export default styles;