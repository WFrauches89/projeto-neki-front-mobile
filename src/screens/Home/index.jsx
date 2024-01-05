import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from './style';
import javaImg from '../../assets/java.png';
import javaScriptImg from '../../assets/javascript.png';
import nativeImg from '../../assets/native.png';
import springImg from '../../assets/spring.png';
import pythonImg from '../../assets/python.png';
import reactImg from '../../assets/react.png';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Home = () => {
    const [skills, setSkills] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('N/A');
    const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
    const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);

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
        Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
        SpringBoot: 'Framework Java',
        React: 'Framework JavaScript',
        ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
    });

    const skillOptions = Object.keys(descriptions);
    const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
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

        if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
            setError('Selecione uma habilidade e nível válidos.');
            return;
        }

        if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
            if (selectedSkillIndex !== null) {
                const updatedSkills = [...skills];
                updatedSkills[selectedSkillIndex] = {
                    image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
                    name: selectedSkill,
                    level: selectedLevel,
                    description: descriptions[selectedSkill] || 'Descrição da Skill',
                };
                setSkills(updatedSkills);
                setShowEditModal(false);
            } else {
                const newSkill = {
                    image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
                    name: selectedSkill,
                    level: selectedLevel,
                    description: descriptions[selectedSkill] || 'Descrição da Skill',
                };
                setSkills([...skills, newSkill]);
                setShowAddModal(false);
            }
            handleCloseModal();
        }
    };

    const handleEditSkillLevel = (index) => {
        try {
            const skillToEdit = skills[index];

            if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
                setError('N/A não é um nível ou habilidade aceitável para edição.');
                return;
            }
            setShowEditModal(true);
            setSelectedSkillIndex(index);
            setSelectedSkill(skillToEdit.name);
            setSelectedLevel(skillToEdit.level);
            setError('');
        } catch (error) {
            console.error('Error in handleEditSkillLevel:', error);
        }
    };

    const handleEditSkill = () => {
        if (selectedLevel === 'N/A') {
            setError('Você deve selecionar um nível válido.');
            return;
        }

        const updatedSkills = [...skills];
        const editedSkill = {
            image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
            name: selectedSkill,
            level: selectedLevel,
            description: descriptions[selectedSkill] || 'Descrição da Skill',
        };

        updatedSkills[selectedSkillIndex] = editedSkill;
        setSkills(updatedSkills);

        setShowEditModal(false);
        handleCloseModal();
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleCloseModal = () => {
        setError('');
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedSkill('');
        setSelectedLevel('N/A');
        setSelectedSkillIndex(null);
        setIsSkillAlreadyAdded(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topo}>
                <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
                <View>
                    <View style={styles.modalFooterButtons}>
                        <TouchableOpacity
                            style={{ ...styles.buttonLogout, backgroundColor: 'red', }}
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
            <View>

                <View>
                    {skills.map((skill, index) => (
                        <View key={index} style={styles.skillItem}>
                            <View style={styles.centerContent}>
                                <Image source={skill.image} style={styles.skillImage} />
                                <View style={styles.textContainer}>
                                    <Text>{skill.name}</Text>
                                    <Text>Nível: {skill.level}</Text>
                                    <Text>{skill.description}</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            <Modal visible={showAddModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <View style={styles.logoContainer}>
                            {imagens[selectedSkill] && (
                                <Image
                                    style={styles.logoImage}
                                    source={imagens[selectedSkill]}
                                    onError={(e) => console.error('Image error:', e.nativeEvent.error)}
                                    onLoad={() => console.log('Image loaded successfully')}
                                />
                            )}
                            {!imagens[selectedSkill] && <Text>! Era IMG !</Text>}
                        </View>
                        <Text style={styles.modalTitle}>Adicionar Skill</Text>
                    </View>
                    <View style={styles.modalBody}>

                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione uma habilidade...',
                                value: null,

                            }}
                            value={selectedSkill}
                            onValueChange={(value) => {
                                console.log('Selected skill:', value);
                                setSelectedSkill(value);
                            }}
                            items={skillOptions.map((option) => ({
                                label: option,
                                value: option,
                            }))}
                            style={{
                                ...pickerSelectStyles,
                                inputAndroidContainer: {
                                    backgroundColor: '#FFF',  // Cor de fundo destacada
                                    borderRadius: 8,  // Borda arredondada
                                    paddingVertical: 15,  // Espaçamento interno vertical
                                    paddingHorizontal: 30,  // Espaçamento interno horizontal
                                    borderWidth: 1,  // Borda
                                    borderColor: 'black',  // Cor da borda
                                    marginBottom: 50,
                                    marginHorizontal: 20,
                                },
                                inputAndroid: {
                                    color: 'black', // Adicione esta linha para a cor do texto
                                    fontSize: 24,    // Adicione esta linha para o tamanho do texto
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                        />

                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione o nível...',
                                value: null,
                            }}
                            value={selectedLevel}
                            onValueChange={(value) => {
                                console.log('Selected level:', value);
                                setSelectedLevel(value);
                            }}
                            items={skillLevels.map((level) => ({
                                label: level,
                                value: level,
                            }))}
                            style={{
                                ...pickerSelectStyles,
                                inputAndroidContainer: {
                                    backgroundColor: '#FFF',  // Cor de fundo destacada
                                    borderRadius: 8,  // Borda arredondada
                                    paddingVertical: 15,  // Espaçamento interno vertical
                                    paddingHorizontal: 30,  // Espaçamento interno horizontal
                                    borderWidth: 1,  // Borda
                                    borderColor: 'black',  // Cor da borda
                                    marginBottom: 50,
                                    marginHorizontal: 20,

                                },
                                inputAndroid: {
                                    color: 'black', // Adicione esta linha para a cor do texto
                                    fontSize: 24,    // Adicione esta linha para o tamanho do texto
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                        />

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
            <Modal visible={showEditModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <View style={styles.logoContainer}>
                            {imagens[selectedSkill] && (
                                <Image
                                    style={styles.logoImage}
                                    source={imagens[selectedSkill]}
                                    onError={(e) => console.error('Image error:', e.nativeEvent.error)}
                                    onLoad={() => console.log('Image loaded successfully')}
                                />
                            )}
                            {!imagens[selectedSkill] && <Text>! Era IMG !</Text>}
                        </View>
                        <Text style={styles.modalTitle}>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione o nível...',
                                value: null,
                            }}
                            value={selectedLevel}
                            onValueChange={(value) => {
                                console.log('Selected level for editing:', value);
                                setSelectedLevel(value);
                            }}
                            items={skillLevels.map((level) => ({
                                label: level,
                                value: level,
                            }))}
                            style={pickerSelectStyles}
                        />
                    </View>
                    <View style={styles.modalFooter}>
                        {error && (
                            <Text style={styles.errorMessage}>{error}</Text>
                        )}
                        <Button title="Cancelar" onPress={handleCloseModal} />
                        <Button title="Salvar Edição" onPress={handleEditSkill} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Home;










// Antes de usar npm install react-native-modal-picker




// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Modal, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { styles } from './style';
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';

// const Home = () => {
//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);

//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };

//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });

//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     useEffect(() => {
//         console.log('Entering useEffect for descriptions');
//         console.log('Selected Skill:', selectedSkill);

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     useEffect(() => {
//         console.log('Entering useEffect for skillOptions and skillLevels');
//         console.log('Selected Skill:', selectedSkill);

//         if (!selectedSkill || !selectedLevel) {
//             setSelectedSkill(skillOptions[0]); // Defina a primeira opção como padrão
//             setSelectedLevel(skillLevels[0]); // Defina o primeiro nível como padrão
//         }
//     }, [selectedSkill, selectedLevel, skillOptions, skillLevels]);

//     const handleAddSkill = () => {
//         console.log('handleAddSkill');

//         setIsSkillAlreadyAdded(false);

//         if (skills.some(skill => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         console.log('handleEditSkillLevel');

//         try {
//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         console.log('handleEditSkill');

//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         console.log('handleDeleteSkill');

//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         console.log('handleCloseModal');

//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.topo}>
//                 <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
//                 <View>
//                     <Button title="Logout" onPress={() => { }} />
//                 </View>
//             </View>
//             <View style={styles.topo}>
//                 <Button title="Adicionar Skill" onPress={() => setShowAddModal(true)} />
//             </View>
//             <View>
//                 <Text style={styles.topoSkill}>Lista de Skills</Text>
//                 <View>
//                     {skills.map((skill, index) => (
//                         <View key={index} style={styles.skillItem}>
//                             <View style={styles.centerContent}>
//                                 <Image source={skill.image} style={styles.skillImage} />
//                                 <View style={styles.textContainer}>
//                                     <Text>{skill.name}</Text>
//                                     <Text>Nível: {skill.level}</Text>
//                                     <Text>{skill.description}</Text>
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//             <Modal visible={showAddModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             {imagens[selectedSkill] && (
//                                 <Image
//                                     style={styles.logoImage}
//                                     source={imagens[selectedSkill]}
//                                     onError={(e) => console.error('Image error:', e.nativeEvent.error)}
//                                     onLoad={() => console.log('Image loaded successfully')}
//                                 />
//                             )}
//                             {!imagens[selectedSkill] && <Text>! Era IMG !</Text>}
//                         </View>
//                         <Text style={styles.modalTitle}>Adicionar Skill</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         {/* <Picker
//                             selectedValue={selectedSkill}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected skill:', itemValue);
//                                 setSelectedSkill(itemValue);
//                             }}
//                         >
//                             {skillOptions.map((option, index) => (
//                                 <Picker.Item key={index} label={option} value={option} />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker> */}
//                         <Picker
//                             selectedValue={selectedSkill}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected skill:', itemValue);
//                                 setSelectedSkill(itemValue);
//                             }}
//                             itemStyle={styles.pickerItem} // Adicione esta linha
//                         >
//                             {skillOptions.map((option, index) => (
//                                 <Picker.Item key={index} label={`Habilidade: ${option}`} value={option} />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                             itemStyle={styles.pickerItem} // Adicione esta linha
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={`Nível: ${level}`} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {isSkillAlreadyAdded && (
//                             <Text style={styles.errorMessage}>A habilidade já foi adicionada anteriormente.</Text>
//                         )}
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar" onPress={handleAddSkill} />
//                     </View>
//                 </View>
//             </Modal>
//             <Modal visible={showEditModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             {imagens[selectedSkill] && (
//                                 <Image
//                                     style={styles.logoImage}
//                                     source={imagens[selectedSkill]}
//                                     onError={(e) => console.error('Image error:', e.nativeEvent.error)}
//                                     onLoad={() => console.log('Image loaded successfully')}
//                                 />
//                             )}
//                             {!imagens[selectedSkill] && <Text>! Era IMG !</Text>}
//                         </View>
//                         <Text style={styles.modalTitle}>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level for editing:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar Edição" onPress={handleEditSkill} />
//                     </View>
//                 </View>
//             </Modal>
//         </View >
//     );
// };

// export default Home;


















// avançando mais um pouco agora renderizando as imagens dentro do lista de skills




// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Modal, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { styles } from './style';
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';

// const Home = () => {
//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);

//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };

//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });

//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     useEffect(() => {
//         console.log('Entering useEffect for descriptions');
//         console.log('Selected Skill:', selectedSkill);

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     const handleAddSkill = () => {
//         console.log('handleAddSkill');

//         setIsSkillAlreadyAdded(false);

//         if (skills.some(skill => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         console.log('handleEditSkillLevel');

//         try {
//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         console.log('handleEditSkill');

//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         console.log('handleDeleteSkill');

//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         console.log('handleCloseModal');

//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.topo}>
//                 <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
//                 <View>
//                     <Button title="Logout" onPress={() => { }} />
//                 </View>
//             </View>
//             <View style={styles.topo}>
//                 <Button title="Adicionar Skill" onPress={() => setShowAddModal(true)} />
//             </View>
//             <View>
//                 <Text style={styles.topoSkill}>Lista de Skills</Text>
//                 <View>
//                     {/* {skills.map((skill, index) => (
//                         <View key={index} style={styles.skillItem}>
//                             <View style={styles.centerContent}>
//                                 // {/* <Image source={{ uri: skill.image }} style={styles.skillImage} />
//                     <View style={styles.textContainer}>
//                         <Text>{skill.name}</Text>
//                         <Text>Nível: {skill.level}</Text>
//                         <Text>{skill.description}</Text>
//                     </View>
//                     <View style={styles.buttonContainer}>
//                         <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
//                         <Button title="Editar Nível" onPress={() => handleEditSkillLevel(index)} />
//                     </View>
//                 </View>
//             </View>
//                     ))} */}

//                     {skills.map((skill, index) => (
//                         <View key={index} style={styles.skillItem}>
//                             <View style={styles.centerContent}>
//                                 <Image source={skill.image} style={styles.skillImage} />
//                                 <View style={styles.textContainer}>
//                                     <Text>{skill.name}</Text>
//                                     <Text>Nível: {skill.level}</Text>
//                                     <Text>{skill.description}</Text>
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             </View >
//             <Modal visible={showAddModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             {imagens[selectedSkill] && (
//                                 <Image
//                                     style={styles.logoImage}
//                                     source={imagens[selectedSkill]}
//                                     onError={(e) => console.error('Image error:', e.nativeEvent.error)}
//                                     onLoad={() => console.log('Image loaded successfully')}
//                                 />
//                             )}
//                             {!imagens[selectedSkill] && <Text>! Era IMG !</Text>}
//                         </View>
//                         <Text style={styles.modalTitle}>Adicionar Skill</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedSkill}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected skill:', itemValue);
//                                 setSelectedSkill(itemValue);
//                             }}
//                         >
//                             {skillOptions.map((option, index) => (
//                                 <Picker.Item key={index} label={option} value={option} />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {isSkillAlreadyAdded && (
//                             <Text style={styles.errorMessage}>A habilidade já foi adicionada anteriormente.</Text>
//                         )}
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar" onPress={handleAddSkill} />
//                     </View>
//                 </View>
//             </Modal>
//             <Modal visible={showEditModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             {imagens[selectedSkill] && (
//                                 <Image
//                                     style={styles.logoImage}
//                                     source={imagens[selectedSkill]}
//                                     onError={(e) => console.error('Image error:', e.nativeEvent.error)}
//                                     onLoad={() => console.log('Image loaded successfully')}
//                                 />
//                             )}
//                             {!imagens[selectedSkill] && <Text>! Era IMG !</Text>}
//                         </View>
//                         <Text style={styles.modalTitle}>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level for editing:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar Edição" onPress={handleEditSkill} />
//                     </View>
//                 </View>
//             </Modal>
//         </View >
//     );
// };

// export default Home;





// avançou mais um pouco...





// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Modal, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { styles } from './style';
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';

// const Home = () => {
//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);

//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };

//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });

//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     useEffect(() => {
//         console.log('Entering useEffect descriptions');

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     useEffect(() => {
//         console.log('Entering useEffect. selectedSkill:', selectedSkill);

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     const handleAddSkill = () => {
//         console.log('handleAddSkill');

//         setIsSkillAlreadyAdded(false);

//         if (skills.some(skill => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         console.log('handleEditSkillLevel');

//         try {
//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         console.log('handleEditSkill');

//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         console.log('handleDeleteSkill');

//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         console.log('handleCloseModal');

//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.topo}>
//                 <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
//                 <View>
//                     <Button title="Logout" onPress={() => { }} />
//                 </View>
//             </View>
//             <View style={styles.topo}>
//                 <Button title="Adicionar Skill" onPress={() => setShowAddModal(true)} />
//             </View>
//             <View>
//                 <Text style={styles.topoSkill}>Lista de Skills</Text>
//                 <View>
//                     {skills.map((skill, index) => (
//                         <View key={index} style={styles.skillItem}>
//                             <View style={styles.centerContent}>
//                                 {/* <Image source={{ uri: skill.image }} style={styles.skillImage} /> */}
//                                 <View style={styles.textContainer}>
//                                     <Text>{skill.name}</Text>
//                                     <Text>Nível: {skill.level}</Text>
//                                     <Text>{skill.description}</Text>
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//             <Modal visible={showAddModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             {/* <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://raw.githubusercontent.com/WFrauches89/projeto-neki-front-web/main/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a.png' }}
//                                 onError={(e) => console.error('Image error:', e.nativeEvent.error)}
//                                 onLoad={() => console.log('Image loaded successfully')}
//                             /> */}
//                             <Text>! Era IMG !</Text>
//                         </View>
//                         <Text style={styles.modalTitle}>Adicionar Skill</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedSkill}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected skill:', itemValue);
//                                 setSelectedSkill(itemValue);
//                             }}
//                         >
//                             {skillOptions.map((option, index) => (
//                                 <Picker.Item key={index} label={option} value={option} />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {isSkillAlreadyAdded && (
//                             <Text style={styles.errorMessage}>A habilidade já foi adicionada anteriormente.</Text>
//                         )}
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar" onPress={handleAddSkill} />
//                     </View>
//                 </View>
//             </Modal>
//             <Modal visible={showEditModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             {/* <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                             /> */}
//                             {/* <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://raw.githubusercontent.com/WFrauches89/projeto-neki-front-web/main/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a.png' }}
//                                 onError={(e) => console.error('Image error:', e.nativeEvent.error)}
//                                 onLoad={() => console.log('Image loaded successfully')}
//                             /> */}
//                             <Text>! Era IMG !</Text>
//                         </View>
//                         <Text style={styles.modalTitle}>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level for editing:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar Edição" onPress={handleEditSkill} />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// export default Home;





// funcioando com erro no modal...



// // index.jsx
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Modal, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { styles } from './style';
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';

// const Home = () => {

//     // console.log('Styles:', styles);

//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);

//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };

//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });

//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     useEffect(() => {
//         console.log('Entering useEffect descriptions');

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     useEffect(() => {
//         console.log('Entering useEffect. selectedSkill:', selectedSkill);

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     const handleAddSkill = () => {
//         console.log('handleAddSkill');

//         setIsSkillAlreadyAdded(false);

//         if (skills.some(skill => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         console.log('handleEditSkillLevel');

//         try {
//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         console.log('handleEditSkill');

//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         console.log('handleDeleteSkill');

//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         console.log('handleCloseModal');

//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.topo}>
//                 <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
//                 <View>
//                     <Button title="Logout" onPress={() => { }} />
//                 </View>
//             </View>
//             <View style={styles.topo}>
//                 <Button title="Adicionar Skill" onPress={() => setShowAddModal(true)} />
//             </View>
//             <View>
//                 <Text style={styles.topoSkill}>Lista de Skills</Text>
//                 <View>
//                     {skills.map((skill, index) => (
//                         <View key={index} style={styles.skillItem}>
//                             <View style={styles.centerContent}>
//                                 <Image source={{ uri: skill.image }} style={styles.skillImage} />
//                                 <View style={styles.textContainer}>
//                                     <Text>{skill.name}</Text>
//                                     <Text>Nível: {skill.level}</Text>
//                                     <Text>{skill.description}</Text>
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//             <Modal visible={showAddModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                             />
//                         </View>
//                         <Text style={styles.modalTitle}>Adicionar Skill</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedSkill}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected skill:', itemValue);
//                                 setSelectedSkill(itemValue);
//                             }}
//                         >
//                             {skillOptions.map((option, index) => (
//                                 <Picker.Item key={index} label={option} value={option} />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {isSkillAlreadyAdded && (
//                             <Text style={styles.errorMessage}>A habilidade já foi adicionada anteriormente.</Text>
//                         )}
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar" onPress={handleAddSkill} />
//                     </View>
//                 </View>
//             </Modal>
//             <Modal visible={showEditModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                             />
//                         </View>
//                         <Text style={styles.modalTitle}>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => {
//                                 console.log('Selected level for editing:', itemValue);
//                                 setSelectedLevel(itemValue);
//                             }}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar Edição" onPress={handleEditSkill} />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// export default Home;







// versão abrindo home e abrindo a modal porém tudo em branco...


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Modal, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import styles from './style'; // Certifique-se de ter o arquivo de estilo para os estilos customizados
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';

// const Home = () => {
//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);

//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };

//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });

//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     useEffect(() => {
//         console.log('Entering useEffect. selectedSkill:', selectedSkill);

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     const handleAddSkill = () => {
//         console.log('handleAddSkill');

//         setIsSkillAlreadyAdded(false);

//         if (skills.some(skill => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         try {
//             console.log('handleEditSkillLevel index:', index);

//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         console.log('handleEditSkill');

//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         console.log('handleDeleteSkill index:', index);

//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         console.log('handleCloseModal');

//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.topo}>
//                 <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
//                 <View>
//                     <Button title="Logout" onPress={() => { }} />
//                 </View>
//             </View>
//             <View style={styles.topo}>
//                 <Button title="Adicionar Skill" onPress={() => setShowAddModal(true)} />
//             </View>
//             <View>
//                 <Text style={styles.topoSkill}>Lista de Skills</Text>
//                 <View>
//                     {skills.map((skill, index) => (
//                         <View key={index} style={styles.skillItem}>
//                             <View style={styles.centerContent}>
//                                 <Image source={{ uri: skill.image }} style={styles.skillImage} />
//                                 <View style={styles.textContainer}>
//                                     <Text>{skill.name}</Text>
//                                     <Text>Nível: {skill.level}</Text>
//                                     <Text>{skill.description}</Text>
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//             <Modal visible={showAddModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                             />
//                         </View>
//                         <Text style={styles.modalTitle}>Adicionar Skill</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedSkill}
//                             onValueChange={(itemValue) => setSelectedSkill(itemValue)}
//                         >
//                             {skillOptions.map((option, index) => (
//                                 <Picker.Item key={index} label={option} value={option} />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => setSelectedLevel(itemValue)}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {isSkillAlreadyAdded && (
//                             <Text style={styles.errorMessage}>A habilidade já foi adicionada anteriormente.</Text>
//                         )}
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar" onPress={handleAddSkill} />
//                     </View>
//                 </View>
//             </Modal>
//             <Modal visible={showEditModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                             />
//                         </View>
//                         <Text style={styles.modalTitle}>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => setSelectedLevel(itemValue)}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar Edição" onPress={handleEditSkill} />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// export default Home;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Modal, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import styles from './style'; // Certifique-se de ter o arquivo de estilo para os estilos customizados
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';


// const Home = () => {
//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);

//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };

//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });

//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     // useEffect(() => {
//     //     console.log('Entering useEffect descriptions');

//     //     if (!descriptions[selectedSkill]) {
//     //         console.log('Setting description for skill:', selectedSkill);

//     //         setDescriptions((prevDescriptions) => ({
//     //             ...prevDescriptions,
//     //             [selectedSkill]: 'Descrição da Skill',
//     //         }));
//     //     }
//     // }, [descriptions, selectedSkill, skillLevels]);

//     useEffect(() => {
//         console.log('Entering useEffect. selectedSkill:', selectedSkill);

//         if (selectedSkill && !descriptions[selectedSkill]) {
//             console.log('Setting description for skill:', selectedSkill);

//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     // useEffect(() => {
//     //     if (selectedSkill && !descriptions[selectedSkill]) {
//     //         setDescriptions((prevDescriptions) => ({
//     //             ...prevDescriptions,
//     //             [selectedSkill]: 'Descrição da Skill',
//     //         }));
//     //     }
//     // }, [descriptions, selectedSkill, skillLevels]);

//     const handleAddSkill = () => {
//         setIsSkillAlreadyAdded(false);

//         if (skills.some(skill => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         try {
//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.topo}>
//                 <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
//                 <View>
//                     <Button title="Logout" onPress={() => { }} />
//                 </View>
//             </View>
//             <View style={styles.topo}>
//                 <Button title="Adicionar Skill" onPress={() => setShowAddModal(true)} />
//             </View>
//             <View>
//                 <Text style={styles.topoSkill}>Lista de Skills</Text>
//                 <View>
//                     {skills.map((skill, index) => (
//                         <View key={index} style={styles.skillItem}>
//                             <View style={styles.centerContent}>
//                                 <Image source={{ uri: skill.image }} style={styles.skillImage} />
//                                 <View style={styles.textContainer}>
//                                     <Text>{skill.name}</Text>
//                                     <Text>Nível: {skill.level}</Text>
//                                     <Text>{skill.description}</Text>
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button title="Deletar" onPress={() => handleDeleteSkill(index)} />
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//             <Modal visible={showAddModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                             />
//                         </View>
//                         <Text style={styles.modalTitle}>Adicionar Skill</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedSkill}
//                             onValueChange={(itemValue) => setSelectedSkill(itemValue)}
//                         >
//                             {skillOptions.map((option, index) => (
//                                 <Picker.Item key={index} label={option} value={option} />
//                             ))}
//                         </Picker>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => setSelectedLevel(itemValue)}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {isSkillAlreadyAdded && (
//                             <Text style={styles.errorMessage}>A habilidade já foi adicionada anteriormente.</Text>
//                         )}
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar" onPress={handleAddSkill} />
//                     </View>
//                 </View>
//             </Modal>
//             <Modal visible={showEditModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalHeader}>
//                         <View style={styles.logoContainer}>
//                             <Image
//                                 style={styles.logoImage}
//                                 source={{ uri: 'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a' }}
//                             />
//                         </View>
//                         <Text style={styles.modalTitle}>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Text>
//                     </View>
//                     <View style={styles.modalBody}>
//                         <Picker
//                             selectedValue={selectedLevel}
//                             onValueChange={(itemValue) => setSelectedLevel(itemValue)}
//                         >
//                             {skillLevels.map((level, index) => (
//                                 <Picker.Item key={index} label={level} value={level} />
//                             ))}
//                         </Picker>
//                     </View>
//                     <View style={styles.modalFooter}>
//                         {error && (
//                             <Text style={styles.errorMessage}>{error}</Text>
//                         )}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar Edição" onPress={handleEditSkill} />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// export default Home;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, Button, Modal } from 'react-native';
// import { styles } from './style';
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Picker } from '@react-native-picker/picker';

// export default function Home() {
//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);
//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };
//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });
//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (!descriptions[selectedSkill]) {
//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     const handleAddSkill = () => {
//         setIsSkillAlreadyAdded(false);

//         if (skills.some((skill) => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         try {
//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     return (
//         <>
//             <View style={styles.container}>
//                 <View style={styles.topo}>
//                     <Text style={styles.textH1}>Bem vindo, NOME - API</Text>
//                     <View>
//                         <Button title="Logout" onPress={() => { }} />
//                     </View>
//                 </View>
//                 <View style={styles.topo}>
//                     <Button
//                         title="Adicionar Skill"
//                         onPress={() => setShowAddModal(true)}
//                     />
//                 </View>
//                 <View>
//                     <Text style={styles.topoSkill}>Lista de Skills</Text>
//                     <View style={styles.skillsList}>
//                         {skills.map((skill, index) => (
//                             <View key={index} style={styles.skillItem}>
//                                 <View style={styles.centerContent}>
//                                     <Image
//                                         source={{ uri: skill.image }}
//                                         alt={skill.name}
//                                         style={styles.skillImage}
//                                     />
//                                     <View style={styles.textContainer}>
//                                         <Text>{skill.name}</Text>
//                                         <Text style={styles.buttonText}>Nível:</Text>
//                                         <Button
//                                             title={skill.level}
//                                             onPress={() => handleEditSkillLevel(index)}
//                                         />
//                                         <Text>{skill.description}</Text>
//                                     </View>
//                                     <View style={styles.buttonContainer}>
//                                         <Icon
//                                             name="trash-alt"
//                                             size={20}
//                                             color="black"
//                                             onPress={() => handleDeleteSkill(index)}
//                                         />
//                                     </View>
//                                 </View>
//                             </View>
//                         ))}
//                     </View>
//                 </View>

//                 {/* Modal de Adição */}
//                 <Modal visible={showAddModal} animationType="slide">
//                     <Modal.Header closeButton>
//                         <Image
//                             style={styles.modalImage}
//                             source={{
//                                 uri:
//                                     'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a',
//                             }}
//                             alt={'Logo Neki'}
//                         />
//                         <Modal.Title>{'Adicionar Skill'}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <View>
//                             <Picker
//                                 selectedValue={selectedSkill}
//                                 onValueChange={(itemValue) => setSelectedSkill(itemValue)}
//                             >
//                                 {skillOptions.map((option, index) => (
//                                     <Picker.Item key={index} label={option} value={option} />
//                                 ))}
//                             </Picker>
//                         </View>
//                         <View>
//                             <Picker
//                                 selectedValue={selectedLevel}
//                                 onValueChange={(itemValue) => setSelectedLevel(itemValue)}
//                             >
//                                 {skillLevels.map((level, index) => (
//                                     <Picker.Item key={index} label={level} value={level} />
//                                 ))}
//                             </Picker>
//                         </View>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         {isSkillAlreadyAdded && (
//                             <Text style={styles.errorMessage}>
//                                 A habilidade já foi adicionada anteriormente.
//                             </Text>
//                         )}
//                         {error && <Text style={styles.errorMessage}>{error}</Text>}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar" onPress={handleAddSkill} />
//                     </Modal.Footer>
//                 </Modal>

//                 {/* Modal de Edição */}
//                 <Modal visible={showEditModal} animationType="slide">
//                     <Modal.Header closeButton>
//                         <Image
//                             style={styles.modalImage}
//                             source={{
//                                 uri:
//                                     'https://github.com/WFrauches89/projeto-neki-front-web/assets/101157962/36eec87c-8406-4096-b1d9-985087dbc66a',
//                             }}
//                             alt={'Logo Neki'}
//                         />
//                         <Modal.Title>{`Habilidade: ${selectedSkill || 'Nome Indefinido'}`}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <View>
//                             <Picker
//                                 selectedValue={selectedLevel}
//                                 onValueChange={(itemValue) => setSelectedLevel(itemValue)}
//                             >
//                                 {skillLevels.map((level, index) => (
//                                     <Picker.Item key={index} label={level} value={level} />
//                                 ))}
//                             </Picker>
//                         </View>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         {error && <Text style={styles.errorMessage}>{error}</Text>}
//                         <Button title="Cancelar" onPress={handleCloseModal} />
//                         <Button title="Salvar Edição" onPress={handleEditSkill} />
//                     </Modal.Footer>
//                 </Modal>
//             </View>
//         </>
//     );
// };




// // segunda tentativa...

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Image, Button } from 'react-native';
// // import ModalSelector from 'react-native-modal-selector';
// // import { ContainerStyled, styles } from './style';
// // import javaImg from '../../assets/java.png';
// // import javaScriptImg from '../../assets/javascript.png';
// // import nativeImg from '../../assets/native.png';
// // import springImg from '../../assets/spring.png';
// // import pythonImg from '../../assets/python.png';
// // import reactImg from '../../assets/react.png';

// // import Icon from 'react-native-vector-icons/FontAwesome5';

// // const Home = () => {
// //     const [skills, setSkills] = useState([]);
// //     const [showAddModal, setShowAddModal] = useState(false);
// //     const [showEditModal, setShowEditModal] = useState(false);
// //     const [selectedSkill, setSelectedSkill] = useState('');
// //     const [selectedLevel, setSelectedLevel] = useState('N/A');
// //     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
// //     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);
// //     const imagens = {
// //         Java: javaImg,
// //         JavaScript: javaScriptImg,
// //         Python: pythonImg,
// //         SpringBoot: springImg,
// //         React: reactImg,
// //         ReactNative: nativeImg,
// //     };
// //     const [descriptions, setDescriptions] = useState({
// //         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
// //         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
// //         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
// //         SpringBoot: 'Framework Java',
// //         React: 'Framework JavaScript',
// //         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
// //     });
// //     const skillOptions = Object.keys(descriptions);
// //     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         if (!descriptions[selectedSkill]) {
// //             setDescriptions((prevDescriptions) => ({
// //                 ...prevDescriptions,
// //                 [selectedSkill]: 'Descrição da Skill',
// //             }));
// //         }
// //     }, [descriptions, selectedSkill, skillLevels]);

// //     const handleAddSkill = () => {
// //         setIsSkillAlreadyAdded(false);

// //         if (skills.some((skill) => skill.name === selectedSkill)) {
// //             setIsSkillAlreadyAdded(true);
// //             return;
// //         }

// //         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
// //             setError('Selecione uma habilidade e nível válidos.');
// //             return;
// //         }

// //         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
// //             if (selectedSkillIndex !== null) {
// //                 const updatedSkills = [...skills];
// //                 updatedSkills[selectedSkillIndex] = {
// //                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
// //                     name: selectedSkill,
// //                     level: selectedLevel,
// //                     description: descriptions[selectedSkill] || 'Descrição da Skill',
// //                 };
// //                 setSkills(updatedSkills);
// //                 setShowEditModal(false);
// //             } else {
// //                 const newSkill = {
// //                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
// //                     name: selectedSkill,
// //                     level: selectedLevel,
// //                     description: descriptions[selectedSkill] || 'Descrição da Skill',
// //                 };
// //                 setSkills([...skills, newSkill]);
// //                 setShowAddModal(false);
// //             }
// //             handleCloseModal();
// //         }
// //     };

// //     const handleEditSkillLevel = (index) => {
// //         try {
// //             const skillToEdit = skills[index];

// //             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
// //                 setError('N/A não é um nível ou habilidade aceitável para edição.');
// //                 return;
// //             }
// //             setShowEditModal(true);
// //             setSelectedSkillIndex(index);
// //             setSelectedSkill(skillToEdit.name);
// //             setSelectedLevel(skillToEdit.level);
// //             setError('');
// //         } catch (error) {
// //             console.error('Error in handleEditSkillLevel:', error);
// //         }
// //     };

// //     const handleEditSkill = () => {
// //         if (selectedLevel === 'N/A') {
// //             setError('Você deve selecionar um nível válido.');
// //             return;
// //         }

// //         const updatedSkills = [...skills];
// //         const editedSkill = {
// //             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
// //             name: selectedSkill,
// //             level: selectedLevel,
// //             description: descriptions[selectedSkill] || 'Descrição da Skill',
// //         };

// //         updatedSkills[selectedSkillIndex] = editedSkill;
// //         setSkills(updatedSkills);

// //         setShowEditModal(false);
// //         handleCloseModal();
// //     };

// //     const handleDeleteSkill = (index) => {
// //         const updatedSkills = [...skills];
// //         updatedSkills.splice(index, 1);
// //         setSkills(updatedSkills);
// //     };

// //     const handleCloseModal = () => {
// //         setError('');
// //         setShowAddModal(false);
// //         setShowEditModal(false);
// //         setSelectedSkill('');
// //         setSelectedLevel('N/A');
// //         setSelectedSkillIndex(null);
// //         setIsSkillAlreadyAdded(false);
// //     };

// //     return (
// //         <ContainerStyled>
// //             <View style={styles.container}>
// //                 {/* ... (rest of your component code) */}

// //                 {/* Modal de Adição */}
// //                 <ModalSelector
// //                     data={skillOptions.map((option, index) => ({
// //                         key: index,
// //                         label: option,
// //                         component: <Text>{option}</Text>,
// //                     }))}
// //                     initValue={selectedSkill}
// //                     onChange={(option) => setSelectedSkill(option.label)}
// //                 />

// //                 {/* Modal de Edição */}
// //                 <ModalSelector
// //                     data={skillLevels.map((level, index) => ({
// //                         key: index,
// //                         label: level,
// //                         component: <Text>{level}</Text>,
// //                     }))}
// //                     initValue={selectedLevel}
// //                     onChange={(option) => setSelectedLevel(option.label)}
// //                 />
// //             </View>
// //         </ContainerStyled>
// //     );
// // };

// // export default Home;


// // terceira tentativa...

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image } from 'react-native';
// import ModalSelector from 'react-native-modal-selector';
// import { ContainerStyled, styles } from './style';
// import javaImg from '../../assets/java.png';
// import javaScriptImg from '../../assets/javascript.png';
// import nativeImg from '../../assets/native.png';
// import springImg from '../../assets/spring.png';
// import pythonImg from '../../assets/python.png';
// import reactImg from '../../assets/react.png';

// const Home = () => {
//     const [skills, setSkills] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState('');
//     const [selectedLevel, setSelectedLevel] = useState('N/A');
//     const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
//     const [isSkillAlreadyAdded, setIsSkillAlreadyAdded] = useState(false);
//     const imagens = {
//         Java: javaImg,
//         JavaScript: javaScriptImg,
//         Python: pythonImg,
//         SpringBoot: springImg,
//         React: reactImg,
//         ReactNative: nativeImg,
//     };
//     const [descriptions, setDescriptions] = useState({
//         Java: 'Linguagem orientada a objetos, essencial para aplicativos empresariais, destacando-se pela portabilidade e confiabilidade',
//         JavaScript: 'Linguagem essencial para desenvolvimento web, permitindo a criação de interfaces dinâmicas e interativas',
//         Python: 'Linguagem versátil, conhecida pela simplicidade e legibilidade, amplamente utilizada em desenvolvimento web, automação e ciência de dados',
//         SpringBoot: 'Framework Java',
//         React: 'Framework JavaScript',
//         ReactNative: 'Framework JavaScript para desenvolvimento de aplicativos móveis nativos',
//     });
//     const skillOptions = Object.keys(descriptions);
//     const skillLevels = ['N/A', 'Básico', 'Intermediário', 'Avançado'];
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (!descriptions[selectedSkill]) {
//             setDescriptions((prevDescriptions) => ({
//                 ...prevDescriptions,
//                 [selectedSkill]: 'Descrição da Skill',
//             }));
//         }
//     }, [descriptions, selectedSkill, skillLevels]);

//     const handleAddSkill = () => {
//         setIsSkillAlreadyAdded(false);

//         if (skills.some((skill) => skill.name === selectedSkill)) {
//             setIsSkillAlreadyAdded(true);
//             return;
//         }

//         if (selectedLevel === 'N/A' || selectedSkill === 'N/A') {
//             setError('Selecione uma habilidade e nível válidos.');
//             return;
//         }

//         if (['Básico', 'Intermediário', 'Avançado'].includes(selectedLevel)) {
//             if (selectedSkillIndex !== null) {
//                 const updatedSkills = [...skills];
//                 updatedSkills[selectedSkillIndex] = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills(updatedSkills);
//                 setShowEditModal(false);
//             } else {
//                 const newSkill = {
//                     image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//                     name: selectedSkill,
//                     level: selectedLevel,
//                     description: descriptions[selectedSkill] || 'Descrição da Skill',
//                 };
//                 setSkills([...skills, newSkill]);
//                 setShowAddModal(false);
//             }
//             handleCloseModal();
//         }
//     };

//     const handleEditSkillLevel = (index) => {
//         try {
//             const skillToEdit = skills[index];

//             if (skillToEdit.level === 'N/A' || skillToEdit.name === 'N/A') {
//                 setError('N/A não é um nível ou habilidade aceitável para edição.');
//                 return;
//             }
//             setShowEditModal(true);
//             setSelectedSkillIndex(index);
//             setSelectedSkill(skillToEdit.name);
//             setSelectedLevel(skillToEdit.level);
//             setError('');
//         } catch (error) {
//             console.error('Error in handleEditSkillLevel:', error);
//         }
//     };

//     const handleEditSkill = () => {
//         if (selectedLevel === 'N/A') {
//             setError('Você deve selecionar um nível válido.');
//             return;
//         }

//         const updatedSkills = [...skills];
//         const editedSkill = {
//             image: imagens[selectedSkill] || 'caminho_padrao_se_nao_encontrar',
//             name: selectedSkill,
//             level: selectedLevel,
//             description: descriptions[selectedSkill] || 'Descrição da Skill',
//         };

//         updatedSkills[selectedSkillIndex] = editedSkill;
//         setSkills(updatedSkills);

//         setShowEditModal(false);
//         handleCloseModal();
//     };

//     const handleDeleteSkill = (index) => {
//         const updatedSkills = [...skills];
//         updatedSkills.splice(index, 1);
//         setSkills(updatedSkills);
//     };

//     const handleCloseModal = () => {
//         setError('');
//         setShowAddModal(false);
//         setShowEditModal(false);
//         setSelectedSkill('');
//         setSelectedLevel('N/A');
//         setSelectedSkillIndex(null);
//         setIsSkillAlreadyAdded(false);
//     };

//     const generateModalOptions = (options) => {
//         return options.map((option, index) => ({
//             key: index,
//             label: option,
//             component: <Text>{option}</Text>,
//         }));
//     };

//     return (
//         <ContainerStyled>
//             <View style={styles.container}>
//                 {/* ... (rest of your component code) */}

//                 {/* Modal de Adição */}
//                 <ModalSelector
//                     data={generateModalOptions(skillOptions)}
//                     initValue={selectedSkill}
//                     onChange={(option) => setSelectedSkill(option.label)}
//                 />

//                 {/* Modal de Edição */}
//                 <ModalSelector
//                     data={generateModalOptions(skillLevels)}
//                     initValue={selectedLevel}
//                     onChange={(option) => setSelectedLevel(option.label)}
//                 />
//             </View>
//         </ContainerStyled>
//     );
// };

// export default Home;
