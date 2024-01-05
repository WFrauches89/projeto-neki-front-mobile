import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from "./style.js";
import Icon from 'react-native-vector-icons/FontAwesome';

const Cadastro = () => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInputUserChange = (text) => {
        setUsername(text);
    };

    const handleInputEmailChange = (text) => {
        setUserEmail(text);
    };

    const handlePassChange = (text) => {
        setPassword(text);
    };

    const showPass = () => {
        setShowPassword(!showPassword);
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
                    <Text style={styles.title}>Cadastre-se</Text>

                    <TextInput
                        style={styles.input}
                        placeholder='Nome do usuário'
                        value={username}
                        onChangeText={handleInputUserChange}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Digite seu e-mail'
                        value={userEmail}
                        onChangeText={handleInputEmailChange}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={handlePassChange}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirme sua senha"
                        secureTextEntry={!showPassword}
                    />

                    <TouchableOpacity onPress={showPass} style={styles.passwordToggle}>
                        <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" />
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Cadastro;