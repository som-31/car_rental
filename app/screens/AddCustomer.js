import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

class AddCustomer extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          customerName: '',
          customerPhoneNo: '',
        }
      }
    
      insertCustomer = () =>{
        fetch('http://10.182.153.235:8000/api/customer', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': `application/json`
            // 'Content-Type': `multipart/form-data; charset=utf-8; boundary= ${Math.random().toString().substr(2)}`
          },
          body: JSON.stringify({
            name : this.state.customerName,
            phone : this.state.customerPhoneNo,
          })
        }).then((response) => response.text())
            .then((responseJson) => {
              // Showing response message coming from server after inserting records.
              Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });
      }

    render(){
        return (
            // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            // <Text>Add Customer</Text>
            <View style={styles.MainContainer}>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}>Customer Registration Form</Text>
          <TextInput
              placeholder="Enter Customer Name"
              onChangeText={ TextInputValue => this.setState({ customerName : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput 
              placeholder="Enter Cell Phone Number"
              onChangeText={ TextInputValue => this.setState({ customerPhoneNo : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          {/* <TextInput 
              placeholder="Enter Student Phone Number"
              onChangeText={ TextInputValue => this.setState({ TextInput_Student_PhoneNumber : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput 
              placeholder="Enter Student Email"
              onChangeText={ TextInputValue => this.setState({ TextInput_Student_Email : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          /> */}
          <TouchableOpacity activeOpacity = { 0.4 } style={styles.TouchableOpacityStyle} onPress={this.insertCustomer} >
            <Text style={styles.TextStyle}> Submit </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity = { 0.4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentListActivity_Function} >
            <Text style={styles.TextStyle}> SHOW ALL INSERTED STUDENT RECORDS IN LISTVIEW </Text>
          </TouchableOpacity> */}
      </View>
        //   </View>
        );
    }
}


export default AddCustomer;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    MainContainer: {
      alignItems: 'center',
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#fff'
    },
    MainContainer_For_Show_StudentList_Activity: {
      flex: 1,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0,
      marginLeft: 5,
      marginRight: 5
    },
    TextInputStyleClass: {
      textAlign: 'center',
      width: '90%',
      marginBottom: 7,
      height: 40,
      borderWidth: 1,
      borderColor: '#FF5722',
      borderRadius: 5,
    },
    TouchableOpacityStyle: {
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
      marginBottom: 7,
      width: '90%',
      backgroundColor: '#00BCD4'
    },
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
    },
  
    rowViewContainer: {
      fontSize: 20,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    }
  });