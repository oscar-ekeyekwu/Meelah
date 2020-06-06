//require fs to read and save meals to storage
const fs = require('fs');
const UniqueID = require('./uniqueID.js');

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

  //get a meal using its ID
  static getMeal(mealID) {
    const meals = this.getMeals();
    let meal;
    meals.forEach((ml) => {
      if (ml.id === mealID) {
        meal = ml;
      }
    });
    return meal;
  }

  //save new meals
  static newMeal(meal) {
    const mealID = UniqueID.generateMealID(this.getMealIDs());
    meal.id = mealID;
    const meals = this.getMeals();

    //add new meal to old meal list
    meals.push(meal);

    //save meals back to storage
    this.saveMeal(meals);
  }

  //get meal ids
  static getMealIDs() {
    const meals = this.getMeals();
    let ids = meals.map((meal) => {
      return meal.id;
    });
    return ids;
  }

  static saveMeal(meals) {
    fs.writeFile('./assets/data/meals.json', JSON.stringify(meals), (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

export default Meals;
