import {View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native'


const HospitalUpdate = ({route}) => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.heading);
    const [textdiscription, onChangediscriptionText] = useState(route.params.item.discription);
    const navigation = useNavigation();




    const updateTodo = ()=>{
        if(textHeading && textHeading.length >0) {
            todoRef.doc(route.params.item.id).update({
                heading: textHeading,
                discription:textdiscription,
            }).then(()=>{
                navigation.navigate('Home')
            }).catch((error)=>{
                alert(error.message)
            })
        }
    }

    return (
        <View style = {styles.container}>

            <Text style = {styles.textField2}>
                Name
            </Text>
            <TextInput 
                style={styles.textField}
                onChangeText = {onChangeHeadingText}
                value = {textHeading}
                placeholder ={'Heading:' + textHeading}
            />
            <Text style = {styles.textField2}>
                Descryption
            </Text>
            <TextInput 
                style={styles.textField}
                onChangeText = {onChangediscriptionText}
                value = {textdiscription}
                multiline = {true}

                placeholder = {"Discription: " + textdiscription}
            />
            <Pressable style={styles.buttonUpdate} onPress = {()=>{updateTodo()}}>
                <Text>
                    UPDATE
                </Text>
            </Pressable>
        </View>
    )
}

export default HospitalUpdate


const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft:15,
        marginRight:15,
    },
    container2:{
        backgroundColor: '#e5e5e5',
        padding:15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center',
    },
    textField:{
        marginBottom:10,
        padding:10,
        fontSize:15,
        color:'#000000',
        backgroundColor:'#e0e0e0',
        borderRadius:5,
    },
    textField2:{
        marginBottom:10,
        padding:10,
        alignItems: 'center',
        textAlign:'left',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonUpdate:{
        marginTop:25,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:12,
        paddingHorizontal:32,
        borderRadius: 4,
        elevation:10,
        backgroundColor:'#0de065',
    }
})