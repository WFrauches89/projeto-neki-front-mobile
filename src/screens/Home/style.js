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
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
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

        color: 'black',
        width: 250,

    },
    buttonContainer: {
        marginLeft: -80,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginVertical: 30,
        width: '90%',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        zIndex: 999,
        borderRadius: 20,
    },
    modalHeader: {
        flexDirection: 'column',
        alignItems: 'center',

    },
    logoContainer: {
        marginRight: 10,
    },
    logoImage: {

        width: 180,
        height: 180,
        marginVertical: 50,
        resizeMode: 'contain',

    },
    modalTitle: {
        fontSize: 50,
        marginLeft: -70,
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
        marginBottom: 40,

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
    },


    modalTitleAddSkill: {
        marginLeft: -140,
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },



    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        marginLeft: 20,
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',

    },

    skillOptionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }

});

