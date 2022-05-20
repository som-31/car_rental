import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { RENTAL_TYPE} from './constants';


class InsertRentalModal extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            CustomerName: '',
            VehicleID: props.VehicleID,
            StartDate: '',
            RentalType: '',
            Qty: '',
            ReturnDate: '',
            TotalAmount: 0,
            Paid: false,
            Category: props.Category,
            Daily: props.Daily,
            Description: props.Description,
            Type: props.Type,
            Weekly: props.Weekly,
            Year: props.Year,
            // name: "",
            // salary: "",
            // age: "",
            loading: false,
            errorMessage: ''
        };

    }

    componentDidMount() {
        // state value is updated by selected employee data
            const { VehicleID, Category, Daily, Description,
                Type, Weekly, Year} = this.props.selectedVehicle;
        this.setState({
            VehicleID, 
            Category, 
            Daily, 
            Description,
            Type, 
            Weekly, 
            Year
        })
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }

    handleRentalChange = (value) => {
        console.log('in here handle Rental Change');
        console.log('Value is', value)
              if(value == 'Daily')
              this.setState({ RentalType : '1' })
              else if(value == 'Weekly')
              this.setState({ RentalType : '7' })

              console.log(this.state);
    }

    insertRental = () => {
        Alert.alert('something in here');
        console.log('in insert rental');
        console.log(this.state);
        
        // this.getTotalAmount();
        // fetch('http://10.182.153.235:8000/api/rental', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': `application/json`
        //     // 'Content-Type': `multipart/form-data; charset=utf-8; boundary= ${Math.random().toString().substr(2)}`
        //   },
        //   body: JSON.stringify({
        //     "CustomerName" : this.state.CustomerName,
        //     "VehicleID": this.state.VehicleID,
        //     "StartDate": this.state.StartDate,
        //     "RentalType": this.state.RentalType,
        //     "Qty": this.state.Qty,
        //     "TotalAmount": this.state.TotalAmount,
        //     "Paid": this.state.Paid
        //   })
        // }).then((response) => response.text())
        //     .then((responseJson) => {
        //       // Showing response message coming from server after inserting records.
        //       Alert.alert(responseJson);
        //     }).catch((error) => {
        //         console.error(error);
        //     });
    }

    getTotalAmount(){
        console.log('in here get total Amount')
        console.log(this.state)
        if(this.state.RentalType && this.state.RentalType == 1){
             this.setState({
                TotalAmount: this.state.RentalType* this.state.Daily*this.state.Qty
            })
            // return this.state.RentalType* this.state.Daily*this.state.Qty
        }else if(this.state.RentalType && this.state.RentalType == 7){
             this.setState({
                TotalAmount: this.state.RentalType* this.state.Weekly*this.state.Qty
            })
            // return this.state.RentalType* this.state.Weekly*this.state.Qty
        }
    }

    render() {
        const { isOpen, closeModal } = this.props;
        const { loading, errorMessage } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Insert Rental Information</Text>
                    <Text>VIN: {this.state.VehicleID}</Text>
                    <Text>Description: {this.state.Description}</Text>
                    <Text>Year: {this.state.Year}</Text>
                    <Text>Type: {this.state.Type}</Text>
                    <Text>Category: {this.state.Category}</Text>
                    <Text>Daily: {this.state.Daily}</Text>
                    <Text>Weekly: {this.state.Weekly}</Text>

 
                    <TextInput 
              placeholder="Enter Customer Name"
                        onChangeText={(text) => this.handleChange(text, "CustomerName")}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}  
          />
          <TextInput
              placeholder="Enter StartDate(YYYY-MM-DD)"
              onChangeText={(text) => this.handleChange(text, "StartDate")}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
                    <TextInput
              placeholder="Enter Rental Type"
              onChangeText={(text) => this.handleChange(text, "RentalType")}
            //   onChangeText={ TextInputValue => {
            //       if(TextInputValue == 'Daily')
            //       this.setState({ RentalType : 1 })
            //       else if(TextInputValue == 'Weekly')
            //       this.setState({ RentalType : 7 })
            //     } }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
                    <TextInput
              placeholder="Enter Quantity(numeric)"
              onChangeText={(text) => this.handleChange(text, "Qty")}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          {/* {this.getTotalAmount()} */}
              {/* <TextInput
              editable={false}
              value={this.getTotalAmount}
            //   placeholder="Enter Quantity(numeric)"
            //   onChangeText={ TextInputValue => this.setState({ Qty : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          /> */}
          {/* <Text>Amount: {this.state.TotalAmount}</Text>
                           <TextInput
              placeholder="Enter Amount"
              onChangeText={ TextInputValue => this.setState({ Paid : true }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          /> */}


                    {/* <TextInput
                        // value={name}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "name")}
                        placeholder="Enter Customer Name" />

                    <TextInput
                        defaultValue={salary}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "salary")}
                        placeholder="salary" /> 
                    <TextInput
                        defaultValue={age}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "age")}
                        placeholder="Age" /> */}

                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.insertRental}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}



export default InsertRentalModal;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
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
})