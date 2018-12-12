import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    }
  }

  componentDidMount() {
    fetch('/api/customer')
      .then(res => res.json())
      .then(customers => this.setState({customers: customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {this.state.customers.map(customer => 
            <li key={customer.id}>{customer.first_name} {customer.last_name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Customers;
