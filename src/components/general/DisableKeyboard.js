import React from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const DisableKeyboard = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            {children}
        </TouchableWithoutFeedback>
    )
}

export default DisableKeyboard
