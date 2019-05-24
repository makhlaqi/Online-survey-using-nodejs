import React from 'react';
import logo from './logo.jpg';
import './App.css';
import Submit from './submit';
import Survey from './survey';
import Homepage from './Homepage';
import Auth from './Auth';

// Mahdi code
function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      <img src={logo} className="App-logo" alt="logo"/>
      <p className= "Title">
          Online survey <code></code>
        </p>
        <p>
          Welcome to the Online Survey Web Application <code></code>
        </p>

        <p>
      <Homepage/>
      
        </p>

        
        


        {!Auth.isUserAuthenticated() ? (
                <div>
             
        <Survey/>        
        <Submit/>
                </div>
             ) :             
  ""}

     
        
        
        
      </header>
    </div>
  );
}

export default App;
