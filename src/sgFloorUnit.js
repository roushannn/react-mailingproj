import React, { useState, useEffect } from "react"

function SgFloorUnit(props) {
    const [floor, setFloor] = useState("")
    const [floorMsg, setFloorMsg] = useState({
        error: false,
        msg: " "
    })
    const [unit, setUnit] = useState("")
    const [unitMsg, setUnitMsg] = useState({
        error: false,
        msg: " "
    })

    function validateFloor(event) {
        let numbers = /^[0-9]+$/
        let error2 = true
        let msg2 = ""

        if(floor === "") {
            if(unit === ""){
                error2 = false
            }
            else {
                msg2 = "floor number is required"
            }
        }

        else {
            if(floor.length > 3) {
                msg2 = "please enter a valid floor number (max 3 digits)"
            }
            else if(!floor.match(numbers)) {
                msg2 = "please enter only numbers"
            }
            else {
                validateUnit()
                error2 = false
            }
        }    
        setFloorMsg({
            error: error2,
            msg: msg2
        })
    }

    function validateUnit(event) {
        let error2 = true
        let msg2 = ""

        if(unit === "") {
            if(floor === "")
                error2 = false
            else {
                msg2 = "Unit number is required"
            }
        }
        else {
            if (floor === "") {
                validateFloor()
            }
            if(unit.length > 5) {
                msg2 = "please enter a valid unit number (max 5 digits)"
            }
            else {
                error2 = false
            }
        }
        setUnitMsg({
            error: error2,
            msg: msg2
        })
    }

    useEffect(() => {
        props.getError({
            floor: floorMsg.error, 
            unit: unitMsg.error
        })
    }, [floorMsg.error, unitMsg.error])

    useEffect(() => {
        setFloor("")
        setUnit("")
    }, [props.clearInput])


    return (
        <div>
            <p>Floor, Unit</p>
            <input className={floorMsg.error === true? 'error' : ''} type="text" name="floor" value={floor} placeholder="floor" 
                onChange={event => setFloor(event.target.value)} 
                onBlur={
                    validateFloor
                    }/>
            <input className={unitMsg.error === true? 'error' : ''} type="text" name="unit" value={unit} placeholder="unit" 
                onChange={event => setUnit( event.target.value)} 
                onBlur={
                    validateUnit
                    }/> <br />
            <p className="errorMsg" style={{display: floorMsg.error === true ? 'block' : 'none' }}>{floorMsg.msg}</p>
            <p className="errorMsg" style={{display: unitMsg.error === true ? 'block' : 'none' }}>{unitMsg.msg}</p>
        </div>
    )
}

export default SgFloorUnit