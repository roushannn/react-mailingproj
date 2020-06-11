import React, { useState } from 'react';

import './App.css';
import SgPostal from "./sgPostal"
import ForeignPostal from "./foreignPostal"

function App() {
  const [country, setCountry] = useState("Singapore")

  return (
    <div className="App">
      <form>
        <p>Country</p>
        <select name="country" value={country} onChange={event => setCountry(event.target.value)}>
            <option value="Singapore">Singapore </option>
            <option value="Malaysia">Malaysia </option>
            <option value="Australia">Australia </option>
        </select> <br />

        <div>{country === "Singapore" ? <SgPostal country={country} /> : <ForeignPostal country={country}/>}</div>

      </form>
      
    </div>
  );
}

export default App;
