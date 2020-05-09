import React from 'react';
import logo from './logo.svg';
import './App.css';

// import a component from react



function App() {
  let main = () => {
    return '<span>This is the main section of the web site.</span>';
  };

  main();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {main()}
    </div>
  );
}

export default App;
