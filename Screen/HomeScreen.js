import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { firebase } from '../firebase'

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }




  return (
    <View style={styles.container}>
      <Text>Email: {firebase.auth().currentUser?.email}</Text>
      <TouchableOpacity
        onPress={()=>{
            navigation.navigate('Vaccine', {});
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Vaccine List </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{
            navigation.navigate('Hospital', {});
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Hospital List </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})