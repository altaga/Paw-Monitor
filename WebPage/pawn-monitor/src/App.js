import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Owner: Victor Altamirano<br />
        Email: myemail@outlook.com<br />
        CellPhone: +52 1 55 1234 5678<br />
        Address: MyStreet #3.1416<br />
        City: Mexico City<br />
        State: CDMX<br />
        ZipCode: 01234<br />
        Country: Mexico<br />
        </p>
      </header>
    </div>
  );
}

export default App;
