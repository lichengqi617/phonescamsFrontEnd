import React, { Component } from "react";
import PhoneTableDataService from "../services/service";
import { Link } from "react-router-dom";
import { JsonToTable } from "react-json-to-table";

export default class PhoneTableList extends Component {
  constructor(props) {
    super(props);
    this.getAll = this.getAll.bind(this);

    this.state = {
      phoneNumbers: [],
      currentIndex: -1,
      searchTitle: ""
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

  render() {
    const { searchTitle, phoneNumbers, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Phone Number List</h4>
          <button className="m-3 btn btn-sm btn-danger" onClick={this.getAll}>Get All</button>
          <JsonToTable json={phoneNumbers} />
        </div>
      </div>
    );
  }
}

