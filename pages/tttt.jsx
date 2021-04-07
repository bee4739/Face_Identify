import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet,
    Button,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    ListItem,
} from 'native-base';
import API from './common/API';
import { CheckBox } from 'react-native-elements';

export default class BorrowData extends Component {
    static navigationOptions = {
        header: () => null,
    };

    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            modaldata: false,
            modal_Location: false,
            modal_Location_end: false,
            location: [],
            Selectindex_location: [],
            Selectindex_location_out: [],
            user_type: [],
        };
    };

    componentDidMount() {
        console.log('User_id:', this.props.navigation.getParam('User_id'));
        console.log('SearchData:', this.props.navigation.getParam('Data'));
        console.log('User_type: ', this.props.navigation.getParam('Type_user'));

        this.setState({ Data: this.props.navigation.getParam('Data') });
        this.setState({ user_type: this.props.navigation.getParam('Type_user') })
        //this.LocationData();
    };

    componentDidUpdate() {
        //console.log('Dataup: ', this.state.Data);
        //console.log('location123: ', this.state.location);
        console.log('checkbox_location: ', this.state.Selectindex_location);
    };

    LocationData = () => {
        fetch(
            `${API}/Location`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        ).then(res => res.json())
            .then(res => {
                console.log('LocationData: ', res);
                this.setState({ location: res });
            })
    };

    accessinTable = () => {
        if (Object.keys(this.state.Selectindex_location).length > 0) {
            Object.keys(this.state.Selectindex_location).forEach(Location_id => {
                if (this.state.Selectindex_location[Location_id] == true) {
                    const data = new FormData()
                    data.append("User_id", this.props.navigation.getParam('User_id'));
                    data.append("Bicycle_id", this.state.Data.Bicycle_id);
                    data.append("Location_id", Location_id);

                    fetch(`${API}/Accessin`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: data,
                    }).then(res => res.json())
                        .then(res => {
                            console.log("ฟังก์ชันที่ 1: ", res);

                            console.log("Updatestart");
                            const dataup = new FormData();
                            dataup.append("Bicycle_id", this.state.Data.Bicycle_id);
                            fetch(`${API}/UpdateStatusbicycle`, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'multipart/form-data',
                                },
                                body: dataup,
                            }).then(res => res.json())
                                .then(res => {
                                    console.log("ฟังก์ชันที่ 2: ", res);
                                });
                        });
                } else {
                    Alert.alert('แจ้งเตือน', 'กรุณาเลือกสถานที่ยืมจักรยาน', [
                        { text: 'ตกลง' },
                    ]);
                }
            });
        } else {
            Alert.alert('แจ้งเตือน', 'กรุณาเลือกสถานที่ยืมจักรยาน', [
                { text: 'ตกลง' },
            ]);
        }
    };

    accessoutTable = () => {
        if (Object.keys(this.state.Selectindex_location_out).length > 0) {
            Object.keys(this.state.Selectindex_location_out).forEach(Location_id => {
                if (this.state.Selectindex_location_out[Location_id] == true) {
                    const dataout = new FormData();
                    dataout.append("User_id", this.props.navigation.getParam('User_id'));
                    dataout.append("Bicycle_id", this.state.Data.Bicycle_id);
                    dataout.append("Location_id", Location_id);

                    fetch(`${API}/Accessout`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: dataout,
                    }).then(res => res.json())
                        .then(res => {
                            console.log('ฟังก์ชันคืนที่ 1: ', res);

                            console.log('Update_out_Start!!');
                            const dataup_out = new FormData();
                            dataup_out.append("Bicycle_id", this.state.Data.Bicycle_id);
                            fetch(`${API}/UpdateStatusbicycle_out`, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'multipart/form-data',
                                },
                                body: dataup_out,
                            }).then(res => res.json())
                                .then(res => {
                                    console.log('ฟังก์ชันคืนที่ 2: ', res);
                                });

                        });
                } else {
                    Alert.alert('แจ้งเตือน', 'กรุณาเลือกสถานที่คืนจักรยาน', [
                        { text: 'ตกลง' },
                    ]);
                }
            });
        } else {
            Alert.alert('แจ้งเตือน', 'กรุณาเลือกสถานที่คืนจักรยาน', [
                { text: 'ตกลง' },
            ]);
        }
    };

    // checkstatusout = () => {
    //     if (this.state.Data.Bicycle_status_name !== 'มีการใช้งานอยู่') {
    //         this.setState({ modal_Location_end: false })
    //         Alert.alert('แจ้งเตือน', 'ไม่สามารถคืนได้! "จักรยานคันนี้ยังไม่ได้ถูกยืม"!!', [
    //             { text: 'ตกลง' },
    //         ]);
    //     }
    // };

    Check_Type_user = () => {
        if(this.state.user_type[0].User_type_name.includes('1')){
            this.props.navigation.navigate('Menuadmin')
        } else if(this.state.user_type[0].User_type_name.includes('2')){
            this.props.navigation.navigate('Menu')
        }
    };

    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={styles.containerview}>
                        <Text style={styles.textHeader}>ข้อมูลการยืมคืนจักรยาน</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ modaldata: true, });
                            }}
                        >
                            <Image
                                style={styles.image}
                                source={require('./image/bicycle.png')}
                            />
                        </TouchableOpacity>

                        <View style={styles.paddingView}>
                            <Text>สีจักรยาน: {this.state.Data.Bicycle_color}</Text>
                            <Text>รหัสคิวอาร์โค้ด: {this.state.Data.QRcode_num}</Text>
                            <Text>รหัสครุภัณฑ์: {this.state.Data.Durable_goods_num}</Text>
                            <Text>รุ่นจักรยาน: {this.state.Data.Model_name}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.buttton}
                            onPress={() => {
                                this.Check_Type_user();
                            }}
                        >
                            <Text style={styles.text}>กลับไปหน้าเมนู</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Modal ข้อมูลจักรยาน----------------------------------------------------------------------- */}
                    <Modal
                        visible={this.state.modaldata}
                    >
                        <ScrollView>
                            <View style={styles.view}>
                                <Card style={styles.Card}>
                                    <CardItem header>
                                        <Text>ข้อมูลจักรยาน</Text>
                                    </CardItem>
                                    <CardItem style={{ width: 300 }} bordered>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>รูปภาพจักรยาน: </Text>
                                        </Body>
                                        <Body>
                                            <Image
                                                style={styles.imageCrad}
                                                source={require('./image/bicycle.png')}
                                            />
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>สีจักรยาน:</Text>
                                        </Body>
                                        <Body>
                                            <Text>{this.state.Data.Bicycle_color}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>รหัสคิวอาร์โค้ด:</Text>
                                        </Body>
                                        <Body>
                                            <Text>{this.state.Data.QRcode_num}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>รหัสครุภัณฑ์:</Text>
                                        </Body>
                                        <Body>
                                            <Text>{this.state.Data.Durable_goods_num}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>รุ่นจักรยาน:</Text>
                                        </Body>
                                        <Body>
                                            <Text>{this.state.Data.Model_name}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>สถานะจักรยาน:</Text>
                                        </Body>
                                        <Body>
                                            <Text>{this.state.Data.Bicycle_status_name}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <TouchableOpacity
                                                style={styles.buttton}
                                                onPress={() => {
                                                    this.setState({
                                                        modal_Location: true,
                                                    });
                                                    this.LocationData();
                                                }}
                                            >
                                                <Text style={styles.text}>ยืมจักรยาน</Text>
                                            </TouchableOpacity>
                                        </Body>
                                        <Body style={{ marginLeft: 85 }}>
                                            <TouchableOpacity
                                                style={styles.buttton}
                                                onPress={() => {
                                                    this.setState({
                                                        modal_Location_end: true,
                                                    });
                                                    this.LocationData();
                                                    // this.checkstatusout();
                                                }}
                                            >
                                                <Text style={styles.text}>คืนจักรยาน</Text>
                                            </TouchableOpacity>
                                        </Body>
                                    </CardItem>
                                </Card>
                                <TouchableOpacity
                                    style={styles.btnBlack}
                                    onPress={() => {
                                        this.setState({
                                            modaldata: false,
                                        });
                                    }}
                                >
                                    <Text style={styles.text}>กลับ</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Modal>
                    {/* Modal ยืมจักรยาน-------------------------------------------------------------------------- */}
                    <Modal
                        visible={this.state.modal_Location}
                    >
                        <ScrollView>
                            <View style={styles.view}>
                                <Text style={styles.textHeader}>กรุณาเลือกสถานที่ยืมจักรยาน</Text>
                                <View style={{ marginTop: 30, }}>
                                    {this.state.location.map((itemValue, itemIndex) => {
                                        return (
                                            <CheckBox
                                                key={itemIndex + 1}
                                                title={itemValue.Location_name}
                                                checked={this.state.Selectindex_location[itemIndex + 1]}
                                                onPress={() => {
                                                    this.setState({
                                                        Selectindex_location: {
                                                            ...this.state.Selectindex_location,
                                                            [itemIndex + 1]: !this.state.Selectindex_location[itemIndex + 1],
                                                        },
                                                    });
                                                }}
                                            />
                                        );
                                    })}
                                    <TouchableOpacity
                                        style={styles.buttonstart}
                                        onPress={() => {
                                            this.accessinTable();
                                        }}
                                    >
                                        <Text style={styles.text}>ยืนยัน</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ ...styles.buttonstart, backgroundColor: 'blue' }}
                                        onPress={() => {
                                            this.setState({ modal_Location: false })
                                        }}
                                    >
                                        <Text style={styles.text}>กลับ</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                    {/* Modal คืนจักรยาน-------------------------------------------------------------------- */}
                    <Modal
                        visible={this.state.modal_Location_end}
                    >
                        <ScrollView>
                            <View style={styles.view}>
                                <Text style={styles.textHeader}>กรุณาเลือกสถานที่คืนจักรยาน</Text>
                                <View style={{ marginTop: 30, }}>
                                    {this.state.location.map((itemValue, itemIndex) => {
                                        return (
                                            <CheckBox
                                                key={itemIndex + 1}
                                                title={itemValue.Location_name}
                                                checked={this.state.Selectindex_location_out[itemIndex + 1]}
                                                onPress={() => {
                                                    this.setState({
                                                        Selectindex_location_out: {
                                                            ...this.state.Selectindex_location_out,
                                                            [itemIndex + 1]: !this.state.Selectindex_location_out[itemIndex + 1],
                                                        },
                                                    });
                                                }}
                                            />
                                        );
                                    })}
                                    <TouchableOpacity
                                        style={styles.buttonstart}
                                        onPress={() => {
                                            this.accessoutTable();
                                        }}
                                    >
                                        <Text style={styles.text}>ยืนยัน</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ ...styles.buttonstart, backgroundColor: 'blue' }}
                                        onPress={() => {
                                            this.setState({ modal_Location_end: false })
                                        }}
                                    >
                                        <Text style={styles.text}>กลับ</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    containerview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 20,
    },
    view: {
        alignItems: 'center',
    },
    paddingView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        elevation: 5,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
    },
    imageCrad: {
        width: 100,
        height: 100,
    },
    Card: {
        width: 300,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'green',
    },
    btnBlack: {
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'blue',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonstart: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'green',
        marginTop: 20,
    },
})
