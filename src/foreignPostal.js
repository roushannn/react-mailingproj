import React, { useState, useEffect } from "react"

function ForeignPostal(props) {
    const [line1, setLine1] = useState("")
    const [line2, setLine2] = useState("")
    const [line3, setLine3] = useState("")

    function clearData() {
        setLine1("")
        setLine2("")
        setLine3("")
    }

    useEffect(() => {
       clearData()
    }, [props.country])
        
    function validateLine(line, name) {
        if(line === "") {
            console.log("please enter address", name)
        }
        
    }

    return(
        <div>
            <p>Address:</p>
            <input type="text" name="line1" value={line1} placeholder="address line 1"
            onChange={event => setLine1(event.target.value)} 
            onBlur={event => validateLine(event.target.value, event.target.name)}/><br />

            <input type="text" name="line2" value={line2} placeholder="address line 2"
            onChange={event => setLine2(event.target.value)}
            onBlur={event => validateLine(event.target.value, event.target.name)}/><br />

            <input type="text" name="line3" value={line3} placeholder="address line 3"
            onChange={event => setLine3(event.target.value)}
            onBlur={event => validateLine(event.target.value, event.target.name)}/><br />
            <br />

            <button disabled={!(line1 !== "" && line2 !== "" && line3 !== "")} >Submit</button>
            
        </div>
    )
}

export default ForeignPostal