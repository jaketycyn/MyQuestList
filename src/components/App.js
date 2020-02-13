import React from 'react';
import Homepage from './Homepage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/about" component={<h1>About</h1>} />
      </div>
    </Router>
  );
}

export default App;
