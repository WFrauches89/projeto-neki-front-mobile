import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import javaImg from '../../assets/java.png';
import javaScriptImg from '../../assets/javascript.png';
import nativeImg from '../../assets/native.png';
import springImg from '../../assets/spring.png';
import pythonImg from '../../assets/python.png';
import reactImg from '../../assets/react.png';
import Icon from 'react-native-vector-icons/AntDesign';

import logoNeki from '../../assets/logoNeki.png';

const Home = () => {
    const [skills, setSkills] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('N/A');
    const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);
    const [newSelectedLevel, setNewSelectedLevel] = useState('');
    const [editedSkillIndex, setEditedSkillIndex] = useState(null);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showLevelModal, setShowLevelModal] = useState(false);

    const imagens = {
        Java: javaImg,
        JavaScript: javaScriptImg,
        Python: pythonImg,
        SpringBoot: springImg,
        React: reactImg,
        ReactNative: nativeImg,
    };

    const [descriptions, setDescriptions] = useState({
        Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
        JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
        Python: 'Linguagem versátil, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
        SpringBoot: 'Framework Java, bbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, bbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,',
        React: 'Framework , bbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, bbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,',
        ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos, bbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    });

    const skillOptions = Object.keys(descriptions);
    const skillLevels = ['Básico', 'Intermediário', 'Avançado'];
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedSkill && !descriptions[selectedSkill]) {
            setDescriptions((prevDescriptions) => ({
                ...prevDescriptions,
                [selectedSkill]: 'Descrição da Skill',
            }));
        }
    }, [descriptions, selectedSkill, skillLevels]);

    useEffect(() => {
        if (!selectedSkill || !selectedLevel) {
            setSelectedSkill(skillOptions[0]);
            setSelectedLevel(skillLevels[0]);
        }
    }, [selectedSkill, selectedLevel, skillOptions, skillLevels]);

    const handleAddSkill = () => {
        setIsSkillAlreadyAdded(false);

        if (skills.some(skill => skill.name === selectedSkill)) {
            setIsSkillAlreadyAdded(true);
            return;
        }

        if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
            const newSkill = {
                image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
                name: selectedSkill,
                level: selectedLevel,
                description: descriptions[selectedSkill] || 'Descrição da Skill',
            };
            setSkills([...skills, newSkill]);
            handleCloseModal();
        }
    };

    const handleEditLevel = (index) => {
        setEditedSkillIndex(index);
        setNewSelectedLevel(skills[index].level);

        setShowLevelModal(true);
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleCloseModal = () => {
        setError('');
        setShowAddModal(false);
        setShowSkillModal(false);
        setShowLevelModal(false);
        setSelectedSkill('');
        setSelectedLevel('N/A');
        setIsSkillAlreadyAdded(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topo}>
                <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
                <View>
                    <View style={styles.modalFooterButtons}>
                        <TouchableOpacity
                            style={{ ...styles.buttonLogout, backgroundColor: 'red' }}
                            onPress={() => { }}
                        >
                            <Text style={styles.buttonTextLogout}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.topo}>
                <View style={styles.modalFooterButtons}>
                    <TouchableOpacity
                        style={{ ...styles.buttonAdd, backgroundColor: 'green' }}
                        onPress={() => setShowAddModal(true)}
                    >
                        <Text style={styles.buttonTextAdd}>Adicionar Skill</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.topoSkill}>Lista de Skills</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {skills.map((skill, index) => (
                    <View key={index} style={styles.skillItem}>
                        <View style={styles.centerContent}>
                            <Image source={skill.image} style={styles.skillImage} />
                            <View style={styles.textContainer}>
                                <Text>{skill.name}</Text>


                                {editedSkillIndex === index ? (
                                    <TouchableOpacity onPress={() => setShowLevelModal(true)} style={{ borderRadius: 5, paddingHorizontal: 15, backgroundColor: '#c9c509', height: 20, marginBottom: 5, marginTop: 5, width: 200 }}>
                                        <Text >Nível: {newSelectedLevel}</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleEditLevel(index)} style={{ borderRadius: 5, paddingHorizontal: 15, backgroundColor: '#c9c509', height: 20, marginBottom: 5, marginTop: 5, width: 200 }}>
                                        <Text >Nível: {skill.level}</Text>
                                    </TouchableOpacity>
                                )}


                                <Text>{skill.description}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={{ ...styles.buttonLogout, backgroundColor: 'red', }}
                                    onPress={() => handleDeleteSkill(index)}
                                >

                                    <Icon name="delete" size={30} color="white" />

                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Modal visible={showAddModal} animationType="slide">
                <View style={styles.modalContainer}>

                    <View style={styles.modalHeader}>
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logoImage}
                                source={logoNeki}
                                onError={(e) => console.error('Image error:', e.nativeEvent.error)}
                                onLoad={() => console.log('Image loaded successfully')}
                            />
                        </View>
                        <View>
                            <Text style={styles.modalTitleAddSkill}>Adicionar Skill</Text>
                        </View>
                    </View>


                    <View style={styles.modalBody}>
                        <TouchableOpacity
                            onPress={() => setShowSkillModal(!showSkillModal)}
                            style={{ ...styles.button, backgroundColor: '#c9c509', height: 45, marginBottom: 50, marginHorizontal: 20, width: 325 }}
                        >
                            <Text style={{ fontSize: 24, color: 'black' }}>
                                {selectedSkill || 'Selecione uma habilidade...'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowLevelModal(!showLevelModal)}
                            style={{ ...styles.button, backgroundColor: '#c9c509', height: 45, marginBottom: 50, marginHorizontal: 20, width: 325 }}
                        >
                            <Text style={{ fontSize: 24, color: 'black' }}>
                                {selectedLevel || 'Selecione o nível...'}
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.modalFooter}>
                        <View style={styles.modalFooterText}>
                            {isSkillAlreadyAdded && (
                                <Text style={styles.errorMessage}>A habilidade já foi adicionada anteriormente.</Text>
                            )}
                            {error && (
                                <Text style={styles.errorMessage}>{error}</Text>
                            )}
                        </View>
                        <View style={styles.modalFooterButtons}>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#7f8180' }}
                                onPress={handleCloseModal}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: '#018328' }}
                                onPress={handleAddSkill}
                            >
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal visible={showSkillModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Selecione uma Habilidade</Text>

                    {skillOptions.map(skill => (
                        <TouchableOpacity
                            style={{ ...styles.button, width: '88%', height: 40, backgroundColor: '#007a60' }}
                            key={skill}
                            onPress={() => {
                                setSelectedSkill(skill);
                                setShowSkillModal(false);
                            }}

                        >
                            <Text style={styles.skillOptionText}>{skill}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>

            <Modal visible={showLevelModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={{ ...styles.modalTitle, letterSpacing: 7, fontSize: 35, }}>Selecione o Nível</Text>

                    {skillLevels.map(level => (
                        <TouchableOpacity
                            key={level}
                            onPress={() => {
                                setNewSelectedLevel(level);
                                setSelectedLevel(level);
                                setShowLevelModal(false);
                            }}
                            style={{ ...styles.button, width: '88%', height: 40, backgroundColor: '#007a60' }}
                        >
                            <Text style={styles.skillOptionText}>{level}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
};

export default Home;












