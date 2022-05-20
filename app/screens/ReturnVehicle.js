import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert,
    ScrollView} from 'react-native';

class ReturnVehicle extends React.Component {


    constructor(props) {
        super(props)
    
        this.state = {
          customerName: '',
          custId: '',
          vin: '',
          returnDate: '',
          Description: '',
          PaymentStatus: false,
          loading: false,
          errorMessage: "",
          paymentDueRecords: [],
          disableStatus: false,
          totalAmount: '',
          buttonText: 'Pay'
        }
      }

    //   componentDidMount() {
    //     this.getData();
    //   }
    
      updatePaymentStatus = () => {
        //   const data = JSON.stringify({
        //     Custid: this.state.custId,
        //     Name: this.state.customerName,
        //     VehicleID: this.state.vin,
        //     Description: this.state.Description,
        //     ReturnDate: this.state.returnDate,
        //     TotalAmount: this.state.totalAmount,
        //     PaymentStatus: true
        // });
        // console.log(data);
        fetch('http://10.182.153.235:8000/api/payment', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': `application/json`
              // 'Content-Type': `multipart/form-data; charset=utf-8; boundary= ${Math.random().toString().substr(2)}`
            },
            body: JSON.stringify({
                Custid: this.state.custId,
                Name: this.state.customerName,
                VehicleID: this.state.vin,
                Description: this.state.Description,
                ReturnDate: this.state.returnDate,
                TotalAmount: this.state.totalAmount,
                PaymentStatus: true
            })
          }).then((response) => response.text())
              .then((responseJson) => {
                let parsedJson = JSON.parse(responseJson);
                console.log(parsedJson);
                this.setState({
                    buttonText: 'Paid',
                    disableStatus: true
                });
                // Showing response message coming from server after inserting records.
                Alert.alert(parsedJson.message);
              }).catch((error) => {
                  console.error(error)
              });
        }
    
      getPaymentDues = () =>{
          console.log('in herer get Payment Dues');
        const query = `?customerName=${this.state.customerName}&vehicleID=${this.state.vin}&returnDate=${this.state.returnDate}`
        fetch(`http://10.182.153.235:8000/api/returnVehicle${query}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': `application/json`
          },
        }).then((response) => response.text())
            .then((responseJson) => {
                let parsedJson = JSON.parse(responseJson);
                console.log(parsedJson.data);
                this.setState({
                    paymentDueRecords: parsedJson.data,
                    totalAmount: parsedJson.data[0].TotalAmount,
                    Description: parsedJson.data[0].Description,
                    custId: parsedJson.data[0].Custid
                });
              // Showing response message coming from server after inserting records.
              Alert.alert(`${parsedJson.data.length} records retrieved successfully`);
            }).catch((error) => {
                console.error(error);
            });
      }

    render(){
        return (
            <View style={styles.MainContainer}>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}>Retrieve Customer Information</Text>
          <TextInput
              placeholder="Enter Customer Name"
              onChangeText={ TextInputValue => this.setState({ customerName : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
           <TextInput 
              placeholder="Enter Vehicle ID"
              onChangeText={ TextInputValue => this.setState({ vin : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
              <TextInput 
              placeholder="Enter Return Date(YYYY-MM-DD) "
              onChangeText={ TextInputValue => this.setState({ returnDate : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TouchableOpacity activeOpacity = { 0.4 } style={styles.TouchableOpacityStyle} onPress={this.getPaymentDues} >
            <Text style={styles.TextStyle}> Submit </Text>
          </TouchableOpacity>

          {/* Code for listing starts from here */}
                <ScrollView>
                <View style={styles.listContainer}>
                <Text style={styles.title}>Payment Dues:</Text>
                {this.state.paymentDueRecords.map((data, index) => <View
                    style={styles.employeeListContainer}
                    key={data.Custid}>
                    <Text style={{ ...styles.listItem, color: "tomato" }}>{index + 1}.</Text>
                    {/* <Text style={styles.name}>{data.CustomerName}</Text> */}
                    <Text style={styles.listItem}>Customer ID: {data.Custid}</Text>
                    <Text style={styles.name}>Customer Name: {data.Name}</Text>
                    <Text style={styles.listItem}>VIN: {data.VehicleID}</Text>
                    <Text style={styles.listItem}>Description: {data.Description}</Text>
                    <Text style={styles.listItem}>Return Date: {data.ReturnDate}</Text>
                    <Text style={styles.listItem}>Amount Due: {data.TotalAmount}</Text>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        disabled={this.state.disableStatus}
                        onPress={() => {
                        this.updatePaymentStatus();
                        // this.setState({ PaymentStatus: true })
                        }}
                        style={{ ...styles.button, marginVertical: 0 }}>
                        <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        onPress={() => {
                        this.toggleDeleteEmployeeModal();
                        this.setState({ selectedEmployee: data })
                        }}
                        style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity> */}
                    </View>
                </View>)}

           {this.state.loading ? <Text
            style={styles.message}>Please Wait...</Text> : this.state.errorMessage ? <Text
              style={styles.message}>{this.state.errorMessage}</Text> : null}

                </View>
                </ScrollView>

      </View>
        //   </View>
        );
    }
}


export default ReturnVehicle;


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
    },
    listContainer: {
        paddingHorizontal: 20
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
      title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
      },
      employeeListContainer: {
        marginBottom: 25,
        elevation: 4,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 6,
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.1)"
      },
      name: {
        fontWeight: "bold",
        fontSize: 16
      },
      listItem: {
        fontSize: 16
      },
      buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
      },
      message: {
        color: "tomato",
        fontSize: 17
      }
  });