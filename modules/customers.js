//require fs to read and save meals to storage
const fs = require('fs');
const UniqueID = require('./uniqueID.js');

class Customers {
  constructor(name, phoneNumber, address) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }

  static getCustomers() {
    let customers;
    const customerData = fs.readFileSync(
      './assets/data/customers.json',
      'utf-8',
      function (err, data) {
        if (err) {
          throw err;
        }
        return data;
      }
    );
    if (!customerData) {
      customers = [];
    } else {
      customers = JSON.parse(customerData);
    }
    return customers;
  }

  static getCustomer(custID) {
    const customers = this.getCustomers();
    let customer;
    customers.forEach((cust) => {
      if (cust.id === custID) {
        customer = cust;
      }
    });
    return customer;
  }

  static getCustIDs() {
    const customers = this.getCustomers();
    let ids = customers.map((customer) => {
      return customer.id;
    });
    return ids;
  }
  static newCustomer(customer) {
    const custID = UniqueID.generateCustID(this.getCustIDs());
    customer.id = custID;
    const customers = this.getCustomers();

    //add new customer to old customer list
    customers.push(customer);

    //save customers back to storage
    this.saveCustomers(customers);
  }

  static saveCustomers(customers) {
    //write back to data storage with new customer
    fs.writeFileSync(
      './assets/data/customers.json',
      JSON.stringify(customers),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }

  //update order details
  static updateOrder(custID, custUpdate) {
    let custToUpdate = this.getCustomer(custID);
    custToUpdate = custUpdate;
  }

  static deleteOrder(custID) {
    const customers = this.getCustomers();
    customers.forEach((customer, index) => {
      if (customer.id === custID) {
        customers.splice(index, 1);
      }
    });

    this.saveOrder(customers);
  }
}

export default Customers;
