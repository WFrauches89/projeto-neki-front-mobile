
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
// import styles from './style.js';
// import { useNavigation } from '@react-navigation/native';

// import Icon from 'react-native-vector-icons/FontAwesome5';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const navigation = useNavigation();

//     const handleInputChange = (text) => {
//         setUsername(text);
//     };

//     const handlePassChange = (text) => {
//         setPassword(text);
//     };

//     const showPass = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.card}>
//                 <View style={styles.logoContainer}>
//                     <Image
//                         source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                         style={styles.logo}
//                     />
//                 </View>

//                 <View style={styles.formContainer}>
//                     <Text style={styles.title}>Login</Text>

//                     <TextInput
//                         style={styles.input}
//                         placeholder='Digite seu e-mail'
//                         value={username}
//                         onChangeText={handleInputChange}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Digite sua senha"
//                         secureTextEntry={!showPassword}
//                         value={password}
//                         onChangeText={handlePassChange}
//                     />

//                     <TouchableOpacity onPress={showPass}>
//                         <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" />

//                     </TouchableOpacity>

//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
//                             <Text style={styles.buttonText}>Entrar</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.forgotPassword}>
//                         <TouchableOpacity>
//                             <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.register}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
//                             <Text>Não tem uma conta?</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const handleInputChange = (text) => {
        setUsername(text);
    };

    const handlePassChange = (text) => {
        setPassword(text);
    };

    const showPass = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        // Adicione aqui a lógica de autenticação, por exemplo, uma chamada à API.
        // Se a autenticação for bem-sucedida, redirecione para a tela Home.
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>

                    <TextInput
                        style={styles.input}
                        placeholder='Digite seu e-mail'
                        value={username}
                        onChangeText={handleInputChange}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={handlePassChange}
                    />

                    <TouchableOpacity onPress={showPass}>
                        <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" />
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.forgotPassword}>
                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.register}>
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                            <Text>Não tem uma conta?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;
