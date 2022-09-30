import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { firebase } from '../firebase';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


const VaccineList = () => {

    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addName, setAddName] = useState('');
    const [addDiscription, setAddDiscription] = useState('');
    const navigation = useNavigation();

// fetch or read the data from firestore
    useEffect(() =>{
        todoRef.orderBy('createdAt', 'desc').onSnapshot(
            querySnapshot => {
                const todos = []
                querySnapshot.forEach((doc) => {
                    const {heading, discription} = doc.data();
                    todos.push({
                        id: doc.id,
                        heading,
                        discription,
                    })
                })
                setTodos(todos)
            }
        )
    }, [])

    // delete a todo from a firestore db


    const deleteTodo = (todos) => {
        todoRef.doc(todos.id).delete().then(()=>{
            //show a successfull alart
            alert('Deleted Successfully')
        })
        .catch((error)=>{
            alert(error);
        })
    }

    const addTodo = ()=>{
        //check if we have a todo
        if(addName && addName.length > 0){
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addName,
                discription:addDiscription,
                createdAt: timestamp
            };
            todoRef.add(data).then(()=>{
                setAddName('');
                setAddDiscription('');
                // release keyboard
                Keyboard.dismiss();
            })
            .catch((error)=>{
                alert(error);
            })
        }
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.formContainer}>
                <TextInput 
                style = {styles.input}
                placeholder = 'Vaccine Name'
                placeholderTextColor='#aaaaaa'
                onChangeText={(heading)=> setAddName(heading)}
                value={addName}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
                />
                <TextInput 
                style = {styles.input}
                placeholder = 'Discription'
                placeholderTextColor='#aaaaaa'
                onChangeText={(discription)=> setAddDiscription(discription)}
                value={addDiscription}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress = {addTodo}>
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={todos}
                numColumns = {1}
                renderItem = {({item}) => (
                    <View>
                        <Pressable style={styles.container} onPress = {()=>navigation.navigate('VaccineUpdate', {item})} >
                            <FontAwesome 
                                name='trash-o'
                                color='#5C3E2A'
                                onPress = {()=>deleteTodo(item)}
                                style = {styles.todoIcon}
                            />

                            <View style={styles.innerContainer} >
                                <Text style={styles.itemHeading} >
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)} 
                                </Text>
                                <Text style={styles.itemdesc}>
                                    {item.discription}
                                </Text>
                            </View>

                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
}

export default VaccineList


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding:15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center',
    },
    innerContainer:{
        alignItems:'stretch',
        flexDirection: 'column',
        marginLeft: 45,
        marginRight: 15,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:100,
    },
    input:{
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor: 'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    button: {
        height:47,
        borderRadius:5,
        backgroundColor:'#788eec',
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonText: {
        fontSize:20,
        color:'white',
    },
    todoIcon: {
        marginTop: 5,
        fontSize:20,
        marginLeft:14,
    }
})