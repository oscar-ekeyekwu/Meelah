//require fs to read and save meals to storage
const fs = require('fs');
const UniqueID = require('./uniqueID.js');
//get day code to use check for current day ids
const dayCode = () => {
  const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  return `${year}${month}${day}`;
};

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

export default Orders;
