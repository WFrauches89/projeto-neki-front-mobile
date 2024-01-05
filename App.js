import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "./src/screens/Login"
import Cadastro from "./src/screens/Cadastro";
import Home from "./src/screens/Home"



const Stacke = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stacke.Navigator initialRouteName="Login">
        <Stacke.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}

        />
        <Stacke.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerShown: false,
          }}

        />
        <Stacke.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }} />
      </Stacke.Navigator>
    </NavigationContainer>

  )

}



// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>  nOpen UP App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
