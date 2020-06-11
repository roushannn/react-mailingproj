import React, { useState, useEffect } from 'react'
import addressData from './addressData'
import SgFloorUnit from './sgFloorUnit'

function SgComponent(props) {
    const [building, setBuilding] = useState("")
    const [postalCode, setPostal] = useState("")
    const [address, setAddress] = useState({
        block: "",
        street: ""
    })
    const [floorUnit, setFloorUnit] = useState(true)
    const [found, setFound] = useState(false)
    const [foundFU, setFoundFU] = useState(true)
    const [className, setClassName] = useState("")

    function clearData() {
        setAddress({
            block: "",
            street: ""
        })
        setFloorUnit(true)
        setFound(false)
        setClassName("")
    }

    useEffect(() => {
       clearData()
    }, [props.country])

    function validatePostalCode(event) {
        event.preventDefault()
        let numbers = /^[0-9]+$/
        let tempAdd = {
            block: "",
            street: ""
        }

        if (!postalCode.match(numbers)) {
             setClassName("error")
    
        } else {
            tempAdd = addressData.find(addressd => addressd.postalCode === postalCode)
            
            if(tempAdd === undefined){
                setClassName("error")
            }
            
            else {
                setFound(true)
                setAddress({
                    block: tempAdd.block,
                    street: tempAdd.street
                })
            }
        }
    }

    function changePostal() {
        if(postalCode !== "" && address.block !== "") {
            setAddress({
                block: "",
                street: ""
            })
            setFloorUnit(false)
            setFound(false)
        }
    }

    function getError(error) {
        if(error.floor || error.unit) {
            setFoundFU(false)
        }
        else{
            setFoundFU(true)
        }
    }

    return (
        <div>
            <p>Postal Code</p>
            <input className={className} type="text" name="postalCode" value={postalCode} 
                placeholder="postal code" 
                onChange={event => {
                    setPostal(event.target.value)
                    changePostal()}}
                required/> 
            <button disabled={postalCode.length < 6} onClick={validatePostalCode}>Search</button> <br />
            <p className="errorMsg" style={{display: className === "error" ? 'block' : 'none' }}>no such postal code found</p>

            <p>Block, Street</p>
            <input type="text" name="block" value={address.block || ""} placeholder="block" 
                disabled={found} 
                onChange={event => setAddress({block: event.target.value})} />

            <input type="text" name="street" value={address.street || ""} placeholder="street" 
                disabled={found} 
                onChange={event => setAddress({street: event.target.value})} /> <br />

            <SgFloorUnit getError={getError}  clearInput={floorUnit}/>

            <p>Building Name (Optional)</p>
            <input type="text" name="buildingName" value={building} placeholder="building name"
                onChange={event => setBuilding(event.target.value)}/>
            <br />
            <button disabled={!(found && foundFU)} >Submit</button>

        </div>
            
    )
}

export default SgComponent