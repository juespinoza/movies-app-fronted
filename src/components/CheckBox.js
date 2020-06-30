import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import  { StyleSheet } from 'react-native'

import { TouchableOpacity, Text } from 'react-native'

const CheckBox = ({ selected, onPress, style, textStyle, size = 30, color = "rgba(255,255,255,1)", text = '', ...props}) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
        <Icon
            size={size}
            color={color}
            name={ selected ? 'check-box' : 'check-box-outline-blank'}
        />

        <Text style={styles.generosFavoritos}> {text} </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    generosFavoritos: {
        color: "rgba(255,255,255,1)",
        fontSize: 17,
        marginLeft: 12
      }
})

export default CheckBox