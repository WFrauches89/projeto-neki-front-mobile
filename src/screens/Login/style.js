// styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
    },
    card: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#f3f3f3',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 120,
    },
    formContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: '80%',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    forgotPassword: {
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: 'blue',
    },
    register: {
        marginBottom: 20,
    },
});

export default styles;



// import { StyleSheet } from "react-native"

// export const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#d9d9d9',


//     },

//     footer: {

//         marginTop: 328,
//         fontStyle: "italic",
//         fontSize: 15,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: 'white',

//     },

// })