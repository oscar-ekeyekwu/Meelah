//require fs to read and save meals to storage
const fs = require('fs');
const UniqueID = require('./uniqueID');
//get day code to use check for current day ids
const dayCode = () => {
  const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  return `${year}${month}${day}`;
};

class Meals {
  //declare meal object
  constructor(meal, type, price) {
    this.meal = meal;
    this.type = type;
    this.price = price;
  }
  //get meals from storage
  static getMeals() {
    let meals;
    const mealData = fs.readFileSync(
      './assets/data/meals.json',
      'utf-8',
      function (err, data) {
        if (err) {
          throw err;
        }
        return data;
      }
    );
    if (!mealData) {
      meals = [];
    } else {
      meals = JSON.parse(mealData);
    }
    return meals;
  }

  //save new meals
  static saveMeal(meal) {
    let meals = this.getMeals();
    meals.push(meal);

    fs.writeFile('./assets/data/meals.json', JSON.stringify(meals), (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

class Orders {
  constructor(customer, meal, time, status) {
    this.customer = customer;
    this.meal = meal;
    this.time = time;
    this.status = status;
  }

  //get all orders from storage
  static getAllOrders() {
    let orders;
    const orderData = fs.readFileSync(
      './assets/data/orders.json',
      'utf-8',
      function (err, data) {
        if (err) {
          throw err;
        }
        return data;
      }
    );
    if (!orderData) {
      orders = [];
    } else {
      orders = JSON.parse(orderData);
    }
    return orders;
  }

  //set order back to storage
  static saveOrder(orders) {
    //write back to data storage with new order
    fs.writeFileSync(
      './assets/data/orders.json',
      JSON.stringify(orders),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }

  //get an order from storage
  static getOrder(orderID) {
    const orders = this.getAllOrders();
    let order;
    orders.forEach((ord) => {
      if (order.id === orderID) {
        order = ord;
      }
    });
    return order;
  }

  //get all order ids
  static getOrderIDs() {
    const orders = this.getAllOrders();
    let ids = orders.map((order) => {
      return order.id;
    });
    return ids;
  }

  //get day's order ids
  static getDayOrderIds() {
    const orderIDs = this.getOrderIDs();
    let id = [];
    orderIDs.forEach((ids) => {
      if (ids.split('-')[1] === dayCode()) id.push(ids);
    });
    return id;
  }

  //save new order to old order list
  static newOrder(order) {
    const orderID = UniqueID.generateOrderID(this.getDayOrderIds());
    order.id = orderID;
    const orders = this.getAllOrders();

    //add new order to old order list
    orders.push(order);

    //save order to storage
    this.saveOrder(orders);
  }

  //update order details
  static updateOrder(orderId, orderUpdated) {
    let orderToUpdate = this.getOrder(orderId);
    orderToUpdate = orderUpdated;
  }

  static deleteOrder(orderID) {
    const orders = this.getAllOrders();
    orders.forEach((order, index) => {
      if (order.id === orderID) {
        orders.splice(index, 1);
      }
    });

    this.saveOrder(orders);
  }
}

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

module.exports = { Meals, Orders, Customers };
