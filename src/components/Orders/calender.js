import * as React from 'react';
import * as RN from 'react-native';

const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December"];

const weekDays = [
    "S", "M", "T", "W", "T", "F", "S"
];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

import Icon from 'react-native-vector-icons/AntDesign'
import colors from '../../assests/styles'
const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = RN.Dimensions.get('window')

const currentDate = new Date()

export default class MyCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeDate: new Date(),
            date: new Date(),
            arrowForward: true,
            initial: false,
            edit: this.props.edit,
            currentDateProp: currentDate.getDate()
        }

    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.edit) {
                this.state.activeDate.setMonth(
                    this.props.order_executation_month, 1
                )
                this.state.date.setMonth(
                    this.props.order_executation_month, 1
                )
                this.setState({
                    currentDateProp: this.props.order_execution_date
                })
            }
        }, 1000);
        if (this.props.edit) {
            this.state.activeDate.setMonth(
                this.props.order_executation_month, 1
            )
            this.state.date.setMonth(
                this.props.order_executation_month, 1
            )
            this.setState({ initial: false, edit: true })
        }
        else {
            this.setState({ initial: true })
        }
        setTimeout(() => {
            this.setState({ initial: false })
        }, 1000);
    }
    generateMatrix() {
        var matrix = [];
        // Create header
        matrix[0] = weekDays;

        // More code here

        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();
        if (this.props.edit) {
            year = this.props.order_execution_year;
            month = this.props.order_executation_month
        }
        if (this.state.initial == true && this.state.activeDate.getDate() == 31) {
            month += 1
            this.state.activeDate.setMonth(
                this.state.activeDate.getMonth() + 1, 1
            )
            this.state.date.setMonth(
                this.state.date.getMonth() + 1, 1
            )
            this.setState({ initial: false })
        }
        else if (month == 3 || month == 5 || month == 8 || month == 10) {
            if (this.state.initial == true && this.state.activeDate.getDate() == 30) {
                this.setState({ initial: false })
                month += 1
                this.state.activeDate.setMonth(
                    this.state.activeDate.getMonth() + 1, 1
                )
                this.state.date.setMonth(
                    this.state.date.getMonth() + 1, 1
                )
            }
        }

        var firstDay = new Date(year, month, 1).getDay();
        var maxDays = nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
                if (this.state.initial == true && this.state.activeDate.getDate() == 29) {
                    month += 1
                    this.state.activeDate.setMonth(
                        this.state.activeDate.getMonth() + 1, 1
                    )
                    this.state.date.setMonth(
                        this.state.date.getMonth() + 1, 1
                    )
                    this.setState({ initial: false })
                }
            }
            else if (this.state.initial == true && this.state.activeDate.getDate() == 30) {
                month += 1
                this.state.activeDate.setMonth(
                    this.state.activeDate.getMonth() + 1, 1
                )
                this.state.date.setMonth(
                    this.state.date.getMonth() + 1, 1
                )
                this.setState({ initial: false })
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }
        return matrix;
    }
    _onPress = (item) => {
        if (item > currentDate.getDate() || (this.props.order_execution_date == currentDate.getDate())) {
            if (!item.match && item != -1) {
                this.setState(() => {
                    this.state.activeDate.setDate(item);
                    return this.state;
                });
                this.props.setCurrentDate(item)
            }
        }
        else if (this.state.activeDate.getMonth() !== currentDate.getMonth()) {
            if (!item.match && item != -1) {
                this.setState(() => {
                    this.state.activeDate.setDate(item);
                    return this.state;
                });
                this.props.setCurrentDate(item)
            }
        }
    };
    changeMonth = (n) => {
        if (Math.sign(n) == -1 || this.state.date.getMonth() + 3 >= this.state.activeDate.getMonth()) {
            this.setState(() => {
                this.state.activeDate.setMonth(
                    this.state.activeDate.getMonth() + n, 1
                )
                return this.state;
            });
            this.state.date.getMonth() + 3 > this.state.activeDate.getMonth() ?
                this.setState({ arrowForward: true }) :
                this.setState({ arrowForward: false })
            if (Math.sign(n) == -1) {
                this.setState({ arrowForward: true })

            }
            this.props.setCurrentMonth(this.state.activeDate.getMonth() + n)
        }
        setTimeout(() => {
            if (this.props.edit) {
                if (this.props.order_executation_month == this.state.activeDate.getMonth())
                    this.setState({
                        currentDateProp: this.props.order_execution_date
                    })
                else {
                    this.setState({
                        currentDateProp: currentDate.getDate()
                    })
                }
            }
        }, 200);
    }
    render() {
        var matrix = this.generateMatrix();
        let requiredMonth = this.state.activeDate.getMonth()
        let currentMonth = currentDate.getMonth()
        if (this.props.edit) {
            requiredMonth = this.props.order_executation_month
            currentMonth = this.props.order_executation_month
        }
        const { order_execution_date, order_executation_month, order_execution_year } = this.props
        var rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                return (
                    <RN.View key={colIndex} style={{ flex: 1 }} >
                        {(item != -1 || rowIndex < 7) && <RN.Text
                            style={{
                                flex: 1,
                                textAlign: rowIndex == 0 ? 'center' : 'right',
                                backgroundColor: rowIndex == 0 ? colors.schedule : order_execution_date == item
                                    && requiredMonth == order_executation_month
                                    ? colors.primary :
                                    item - 1 < this.state.currentDateProp
                                        && requiredMonth == currentMonth
                                        ?
                                        "white" : "white",
                                color: order_execution_date == item
                                    && requiredMonth == order_executation_month
                                    ? "white" :
                                    item - 1 < this.state.currentDateProp
                                        && requiredMonth == currentMonth
                                        ?
                                        colors.inputFields : colors.camera,
                                borderWidth: 0.5,
                                padding: DEVICE_WIDTH > 700 ? 8 : DEVICE_HEIGHT > 600 ? 4 : 3,
                                borderColor: colors.inputFields,
                                paddingRight: rowIndex == 0 ? 0 : 5,
                                fontFamily: colors.font,
                            }}
                            onPress={() => {
                                order_execution_date == item
                                    && requiredMonth == order_executation_month
                                    ? this._onPress(item) :
                                    item - 1 < this.state.currentDateProp
                                        && requiredMonth == currentMonth
                                        ?
                                        console.log('') : this._onPress(item)
                                // this._onPress(item)
                            }}
                        >
                            {item != -1 ? item : ''}
                        </RN.Text>}
                    </RN.View >
                );
            });
            return (
                <RN.View
                    key={rowIndex}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '90%',
                    }}>
                    {rowItems}
                </RN.View >
            );
        });

        return (
            <RN.View>
                <RN.View style={{
                    flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between',
                }} >
                    <RN.Text style={{
                        fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
                        fontFamily: colors.font,
                    }}>
                        {months[requiredMonth]} {order_execution_year}
                    </RN.Text>
                    <RN.View style={{ flexDirection: 'row' }} >
                        {this.state.date.getMonth() < this.state.activeDate.getMonth() && < RN.TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={() => this.changeMonth(-1)}
                        >
                            <Icon name='arrowleft' size={15} />
                        </RN.TouchableOpacity>}
                        {this.state.arrowForward && <RN.TouchableOpacity
                            onPress={() => this.changeMonth(+1)}
                        >
                            <Icon name='arrowright' size={15} />
                        </RN.TouchableOpacity>}
                    </RN.View>
                </RN.View>
                <RN.View style={{
                    borderWidth: 1, width: DEVICE_WIDTH > 700 ? '70%' : '85%',
                    borderColor: colors.inputFields
                }}>
                    {rows}
                </RN.View>
            </RN.View >
        );
    }
}