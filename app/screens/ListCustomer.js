import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert,
        ScrollView} from 'react-native';

class ListCustomer extends React.Component {


    constructor(props) {
        super(props)
    
        this.state = {
          customerName: '',
          custId: '',
          loading: false,
          errorMessage: "",
          customerRecords: []
        }
      }

      componentDidMount() {
        this.getData();
      }
    
      getData = () => {
        this.setState({ errorMessage: "", loading: true })
        fetch(`http://10.182.153.235:8000/api/getCustomer`, {
          method: "GET"
        })
          .then(res => res.text())
          .then(res => {
            let parsedJson = JSON.parse(res);
            // console.log(parsedJson.data);
                    this.setState({
                    customerRecords: parsedJson.data,
                    loading: false, 
                    errorMessage: ""
                })
        })
          .catch(() => this.setState({
            loading: false,
            errorMessage: "Network Error. Please try again."
          }))
      }

    
      getCustomer = () =>{
        let queryStr = '';  
        if(this.state.custId && this.state.customerName){
            queryStr = `?custId=${this.state.custId}&customerName=${this.state.customerName}`
        }else if(this.state.custId){
            queryStr = `?custId=${this.state.custId}`
        }else if(this.state.customerName){
            queryStr = `?customerName=${this.state.customerName}`
        }
          console.log('query string is ', queryStr);
        fetch(`http://10.182.153.235:8000/api/getCustomer`+queryStr, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': `application/json`
          },
        }).then((response) => response.text())
            .then((responseJson) => {
                let parsedJson = JSON.parse(responseJson);
                console.log(parsedJson.data);
                this.setState({customerRecords: parsedJson.data});
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
              placeholder="Enter Customer Id"
              onChangeText={ TextInputValue => this.setState({ custId : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput
              placeholder="Enter Customer Name"
              onChangeText={ TextInputValue => this.setState({ customerName : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TouchableOpacity activeOpacity = { 0.4 } style={styles.TouchableOpacityStyle} onPress={this.getCustomer} >
            <Text style={styles.TextStyle}> Submit </Text>
          </TouchableOpacity>

          {/* Code for listing starts from here */}
                <ScrollView>
                <View style={styles.listContainer}>
                <Text style={styles.title}>Emloyee Lists:</Text>
                {this.state.customerRecords.map((data, index) => <View
                    style={styles.employeeListContainer}
                    key={data.CustomerId}>
                    <Text style={{ ...styles.listItem, color: "tomato" }}>{index + 1}.</Text>
                    {/* <Text style={styles.name}>{data.CustomerName}</Text> */}
                    <Text style={styles.listItem}>Customer ID: {data.CustomerId}</Text>
                    <Text style={styles.name}>Customer Name: {data.CustomerName}</Text>
                    <Text style={styles.listItem}>Remaining Balance: {data.RemainingBalance}</Text>

                    {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                        this.toggleEditEmployeeModal();
                        this.setState({ selectedEmployee: data })
                        }}
                        style={{ ...styles.button, marginVertical: 0 }}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity
                        onPress={() => {
                        this.toggleDeleteEmployeeModal();
                        this.setState({ selectedEmployee: data })
                        }}
                        style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity> */}
                    </View>
                )}

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


export default ListCustomer;


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