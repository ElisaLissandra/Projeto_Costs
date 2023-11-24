import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'


function App() {
  return (
   <Router>
      <ul>
        <li>Home</li>
        <li>Contato</li>
      </ul>
      <Routes>
        <Route path="/">
          <Home />
        </Route>
        <Route exact path="/company">
          <Company/>
        </Route>
        <Route exact path="/contact">
          <Contact/>
        </Route>
        <Route exact path="/newproject">
          <NewProject/>
        </Route>
      </Routes>
      <p>Footer</p>
   </Router>
  );
}

export default App;
