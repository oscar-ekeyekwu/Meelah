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
