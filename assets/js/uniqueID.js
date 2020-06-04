class UniqueID {
  static generateMealID(existingIDs) {
    let lastId, lastIdNum, newId;

    //get the last id from the existing id
    lastId = existingIDs[existingIDs.length - 1];
    if (lastId) {
      lastIdNum = parseInt(lastId.split('-')[2]);
      newId = lastIdNum + 10;
    } else {
      newId = 10;
    }

    //generate day code for new id
    const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

    //generate new order Id
    const id = `ML-${year}${month}${day}-00${newId}`;

    return id;
  }

  static generateOrderID(existingIDs) {
    let lastId, lastIdNum, newId;

    //get the last id from the existing id
    lastId = existingIDs[existingIDs.length - 1];
    if (lastId) {
      lastIdNum = parseInt(lastId.split('-')[2]);
      newId = lastIdNum + 10;
    } else {
      newId = 10;
    }

    //generate day code for new id
    const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

    //generate new order Id
    const id = `OD-${year}${month}${day}-00${newId}`;

    return id;
  }

  static generateCustID(existingIDs) {
    let lastId, lastIdNum, newId;

    //get the last id from the existing id
    lastId = existingIDs[existingIDs.length - 1];
    newId = lastId + 5;

    return newId;
  }
}

module.exports = UniqueID;
