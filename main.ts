/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Elliott Roach
 * Created on: nov 2024
 * This program transmits to close if 9 cm or closer
*/

//setup
let distanceToObject: number = 0
radio.setGroup(218)
basic.clearScreen()
basic.showIcon(IconNames.Happy)

//taking distance and sending transmition if 9 cm or less
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()

    //taking distance forever
    basic.forever(function() {
        distanceToObject = sonar.ping(
            DigitalPin.P15,
            DigitalPin.P14,
            PingUnit.Centimeters,
        )
    })

    //sending to close trasmition if 9 cm or closer
    if (distanceToObject < 10) {
        basic.showIcon(IconNames.Sad)
        radio.sendString("To Close")
        basic.showIcon(IconNames.Happy)
    }
})

//displaying transmition if given
radio.onReceivedString(function (receivedString) {
    basic.clearScreen()
    basic.showString(receivedString)
    basic.showIcon(IconNames.Happy)
})