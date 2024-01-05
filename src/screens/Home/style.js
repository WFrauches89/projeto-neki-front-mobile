import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
    },
    topo: {
        flexDirection: 'row',
        paddingTop: 45,
        alignItems: 'center',
        marginTop: 10,
    },
    textH1: {
        marginLeft: 60,
        fontSize: 24,
        fontWeight: 'bold',
    },
    topoSkill: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        marginLeft: -190,
    },
    skillItem: {
        width: 380,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    centerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    skillImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        color: 'black',
    },
    buttonContainer: {
        marginLeft: 5,
    },
    modalContainer: {
        flex: 0.9,
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginVertical: 30,
        width: '90%',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        zIndex: 999,
        borderRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    logoContainer: {
        marginRight: 10,
    },
    logoImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    modalFooter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    modalFooterText: {
        marginHorizontal: 30,
        marginBottom: 30,
    },
    modalFooterButtons: {
        flexDirection: 'row',

    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
        fontSize: 20,
    },


    button: {
        borderRadius: 8,
        padding: 10,
        width: '40%',
        alignItems: 'center',
        marginLeft: 25,

    },

    buttonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },

    buttonLogout: {
        borderRadius: 8,
        width: '40%',
        marginLeft: 80,
        alignItems: 'center',
        padding: 6,

    },
    buttonTextLogout: {
        color: 'white',
        fontSize: 20,
    },
    buttonAdd: {
        borderRadius: 8,
        width: '80%',
        marginLeft: -40,
        alignItems: 'center',
        padding: 6,
    },
    buttonTextAdd: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    }
});



