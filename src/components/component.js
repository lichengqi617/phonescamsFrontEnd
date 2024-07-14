import React, { Component } from "react";
import PhoneTableDataService from "../services/service";
import { Link } from "react-router-dom";
import { JsonToTable } from "react-json-to-table";

export default class PhoneScamDBApp extends Component {
  constructor(props) {
    super(props);
    this.getAll = this.getAll.bind(this);
    this.add = this.add.bind(this);

    this.state = {
      phoneNumbers: [],
      currentIndex: -1,
      searchTitle: "",
      PhoneNumber: null,
      CountryCode: null
    };
  }

  getAll() {
      this.setState({
        phoneNumbers: []
      })
      PhoneTableDataService.getAll()
        .then(response => {
          console.log(response.data);
          this.setState({
            phoneNumbers: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
    }

  add() {
      PhoneTableDataService.add(this.CountryCode, this.PhoneNumber)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  
  render() {
    const { searchTitle, phoneNumbers, currentIndex } = this.state;
    return (
    <div id="parent">
      <div className="list row">
        <div className="col-md-6">
          <h4>Phone Number List</h4>
          <button className="m-3 btn btn-sm btn-danger" onClick={this.getAll}>Get Phone Numbers</button>
          <JsonToTable json={phoneNumbers} />
        </div>
      </div>
      <div className="list row">
          <div className="col-md-6">
            <h4>Phone Number Input</h4>
            <button className="m-3 btn btn-sm btn-danger" onClick={this.add}>Add</button>
            <input type="text" id="CountryCode" name="CountryCode" value={ this.state.CountryCode } onChange={ this.handleChange }></input>
            <input type="text" id="PhoneNumber" name="PhoneNumber" value={ this.state.PhoneNumber } onChange={ this.handleChange }></input>
          </div>
      </div>
    </div>
    );
  }
}