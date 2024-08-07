import React, { Component } from "react";
import PhoneTableDataService from "../services/service";
import { Link } from "react-router-dom";
import { JsonToTable } from "react-json-to-table";

export default class PhoneScamDBApp extends Component {
  constructor(props) {
    super(props);
    this.getAll = this.getAll.bind(this);
    this.getMostVoted = this.getMostVoted.bind(this);
    this.add = this.add.bind(this);

    this.state = {
      phoneNumbersByUpdateTime: [],
      phoneNumbersByVotes: [],
      PhoneNumber: null,
      CountryCode: null,
      Message: null
    };
  }

  getAll() {
      this.setState({
        phoneNumbersByUpdateTime: []
      })
      PhoneTableDataService.getAll()
        .then(response => {
          console.log(response.data);
          this.setState({
            phoneNumbersByUpdateTime: response.data
          });
          const tableBody = document.querySelector('#data-table tbody');
          tableBody.innerHTML = '';
        
          response.data.forEach(item => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${item.id}</td>
                  <td>${item.countryCode}</td>
                  <td>${item.phoneNumber}</td>
                  <td>${item.voteCount}</td>
                  <td>${item.updateTime}</td>
                  <td>${item.status}</td>
              `;
              tableBody.appendChild(row);
          });
        })
        .catch(e => {
          console.log(e);
        });
    }

  getMostVoted() {
      this.setState({
        phoneNumbersByVotes: []
      })
      PhoneTableDataService.getMostVoted()
        .then(response => {
          console.log(response.data);
          this.setState({
            phoneNumbersByVotes: response.data
          });
          const tableBody = document.querySelector('#data-table tbody');
          tableBody.innerHTML = '';

          response.data.forEach(item => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${item.id}</td>
                  <td>${item.countryCode}</td>
                  <td>${item.phoneNumber}</td>
                  <td>${item.voteCount}</td>
                  <td>${item.updateTime}</td>
                  <td>${item.status}</td>
              `;
              tableBody.appendChild(row);
          });
        })
        .catch(e => {
          console.log(e);
        });
    }

  add() {
      PhoneTableDataService.add(this.state.CountryCode, this.state.PhoneNumber, this.state.Message)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

  handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;
      this.setState({
        [name]: value
      });
  }
  
  render() {
      const { phoneNumbersByUpdateTime, phoneNumbersByVotes, PhoneNumber, CountryCode, Message} = this.state;
      return (
      <div id="parent">
        <div class="update-section">
             <button type="submit" onClick={this.getAll}>Check Most Recent Scam Reports</button>
             <button type="submit" onClick={this.getMostVoted}>Check Most Common Scam Numbers</button>
        </div>
        <div class="list-section">
          <table id="data-table">
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Country Code</th>
                      <th>Phone Number</th>
                      <th>Report Count</th>
                      <th>Updated Time</th>
                      <th>Status</th>
                  </tr>
              </thead>
              <tbody>
              </tbody>
          </table>
        </div>
        <div class="report-section">
            <h3>Report Phone Scam</h3>
            <form id="add-record-form">
                <label for="CountryCode">Country Code:</label>
                <input type="text" id="CountryCode" name="CountryCode" value={ this.state.CountryCode } onChange={ this.handleChange } required/><br></br>
                <label for="PhoneNumber">Phone Number:</label>
                <input type="text" id="PhoneNumber" name="PhoneNumber" value={ this.state.PhoneNumber } onChange={ this.handleChange } required/><br></br>
                <label for="Message">Message:</label>
                <textarea id="Message" name="Message" value={ this.state.Message } onChange={ this.handleChange } cols="25" rows="20"/><br></br>
                <button type="submit" onClick={this.add}>Submit</button>
            </form>
        </div>
      </div>
    );
  }
}