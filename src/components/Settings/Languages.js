import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import colors from '../../assests/styles'
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

const Languages = (props) => {
    const [langues, setLangues] = useState([
        {
            name: 'Arabic',
            lang: 'arabic'
        },
        {
            name: 'English',
            lang: 'en'
        },
    ])
    const [lang, setLang] = useState('en')
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }} >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '80%',
                marginBottom: 60
            }} >
                {langues.map((item, i) => {
                    return (
                        <TouchableOpacity key={i} style={[styles.list, {
                            justifyContent: 'center'
                        }]}
                            onPress={() => setLang(item.lang)}
                        >
                            <View
                                style={{
                                    borderColor: colors.primary,
                                    width: DEVICE_WIDTH > 700 ? 30 : 20,
                                    height: DEVICE_WIDTH > 700 ? 30 : 20,
                                    borderRadius: 50,
                                    borderWidth: 2,
                                    backgroundColor: lang == item.lang ? colors.primary : 'white',
                                    marginRight: 10
                                }}
                            ></View>
                            <Text style={[styles.primaryText, { color: 'black' }]} >{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <TouchableOpacity style={styles.primaryBtn}
                mode='contained'
                onPress={() => props.navigation.goBack()}
            >
                <Text style={styles.primaryText} >Change</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Languages

const fontFamily = colors.font

const styles = StyleSheet.create({
    primaryBtn: {
        width: '80%',
        backgroundColor: colors.primary,
        marginTop: 10,
        borderRadius: 10,
        height: DEVICE_HEIGHT > 600 ? 55 : 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20
    },
    primaryText: {
        color: colors.white,
        fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
        fontFamily
    },
    list: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    }
})