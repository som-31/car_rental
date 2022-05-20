import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { category, type } from './constants';
// import { Picker } from 'react-native-form-component';

class AddVehicle extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          vehicleId: '',
          description: '',
          year: '',
          type: 1,
          category: 1
        }
      }
    
       insertVehicle = () =>{
        console.log('type is',type[this.state.type.toUpperCase()]);
        console.log('Category is', category[this.state.category.toUpperCase()]);
        console.log(this.state);
        fetch('http://10.182.153.235:8000/api/vehicle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': `application/json`
            // 'Content-Type': `multipart/form-data; charset=utf-8; boundary= ${Math.random().toString().substr(2)}`
          },
          body: JSON.stringify({
            vehicleID : this.state.vehicleId,
            description : this.state.description,
            year : this.state.year,
            type : type[this.state.type.toUpperCase()] ,
            category : category[this.state.category.toUpperCase()]
          })
        }).then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson);
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
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}>Vehicle Registration Form</Text>
          <TextInput
              placeholder="Enter Vehicle ID"
              onChangeText={ TextInputValue => this.setState({ vehicleId : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput 
              placeholder="Enter Description"
              onChangeText={ TextInputValue => this.setState({ description : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput 
              placeholder="Enter Year"
              onChangeText={ TextInputValue => this.setState({ year : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
                    <TextInput 
              placeholder="Enter Type"
              onChangeText={ TextInputValue => this.setState({ type : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
                              <TextInput 
              placeholder="Enter Category"
              onChangeText={ TextInputValue => this.setState({ category : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          {/* <Picker
        //   1:Compact, 2:Medium, 3:Large, 4:SUV, 5:Truck, 6:VAN  
                items={[
                { label: 'Compact', value: 1 },
                { label: 'Medium', value: 2 },
                { label: 'Large', value: 3 },
                { label: 'SUV', value: 4 },
                { label: 'Truck', value: 5 },
                { label: 'VAN', value: 6 },
                ]}
                label="Select Type"
                selectedValue={this.type}
                onSelection={(item) => this.setState({type: item.value})}
            /> */}
          <TouchableOpacity activeOpacity = { 0.4 } style={styles.TouchableOpacityStyle} onPress={this.insertVehicle} >
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


export default AddVehicle;
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