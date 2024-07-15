import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PhoneScamDBApp from "./components/component";

class App extends Component {
  render() {
    return (
      <div>
        <div class="top-bar">
            <p>Hi there, this website is to create a database of phone scams. You can check the latest reported phone scams and report new phone scams.</p>
        </div>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<PhoneScamDBApp/>} />
          </Routes>
        </div>
        <a href="https://amzn.to/3LgQt4K">
            Amazon advertisement
        </a>
      </div>
    );
  }
}

export default App;
