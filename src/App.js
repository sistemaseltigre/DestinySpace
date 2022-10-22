import './App.scss';
import './cssreset.scss'
import Game from './components/Game/Game' 
import React from 'react';
// import Login from './components/Login' 

function App() {
  return (
    <div className="App">
      <Game/>
      {/* <Login/> */}
    </div>
  );
}

export default App;
