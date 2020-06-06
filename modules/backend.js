import { Meals, Orders, Customers } from './meelah.js';
console.log(Meals);

const newMealForm = document.querySelector('#newMealForm');

newMealForm.addEventListener('submit', function (e) {
  let newMeal = {
    meal: this.meal.value,
    type: this.type.value,
    price: this.price.value,
  };

  console.log(newMeal);

  e.preventDefault();
});
