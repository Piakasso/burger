// Ingredients
const ingredients = document.querySelectorAll(".ingredients__item"),
  timerOfMeal = document.querySelector("._clock span"),
  deleteButtons = document.querySelectorAll(".item__remove"),
  constructorField = document.querySelector(".constructor__burger"),
  checkoutPage = document.querySelector(".checkout"),
  weightOfMeal = document.querySelector("._weight span"),
  caloriesOfMeal = document.querySelector("._calories span"),
  notice = document.querySelector(".constructor__notice"),
  costs = document.querySelectorAll(".info__cost span"),
  ketchup = document.querySelector(".info__ketchup");

let zIndex = 3,
  bottomMargin = 0,
  numOfMinutes = 0,
  numOfGramms = 50,
  numOfCalories = 90,
  numOfMoney = 0;

//Add Layers
function addLayers(data) {
  ingredients.forEach((item) => {
    let counter = 0;
    item.addEventListener("click", (e) => {
      //Push add buttons
      if (e.target.classList.contains("item__add")) {
        let action = e.target;
        let newElement = document.createElement("img");
        counter += 1;
        action.previousElementSibling.textContent = `${counter}`;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name == action.getAttribute("data-name")) {
            newElement.src = `${data[i].img}`;
            newElement.classList.add("new__layer");
            newElement.style.zIndex = `${zIndex++}`;
            newElement.setAttribute("data-name", `${data[i].name}`);
            newElement.setAttribute("data-width", `${data[i].width}`);
            bottomMargin += data[i].width;
            newElement.style.bottom = `${bottomMargin}%`;
            constructorField.prepend(newElement);
            deleteButtons.forEach((button) => {
              if (
                action.getAttribute("data-name") ===
                button.getAttribute("data-name")
              ) {
                button.classList.remove("_disabled");
              }
            });
            addNumToCalc(data[i]);
          }
        }
      }

      //Push delete buttons
      else if (e.target.classList.contains("item__remove") && counter > 0) {
        let action = e.target;
        counter -= 1;
        action.nextElementSibling.textContent = `${counter}`;
        let elements = document.querySelectorAll(".new__layer");
        for (let i = 0; i < elements.length; i++) {
          if (
            action.getAttribute("data-name") ===
            elements[i].getAttribute("data-name")
          ) {
            for (let j = 0; j < i; j++) {
              elements[j].style.bottom = `${
                elements[j].style.bottom.slice(0, -1) -
                elements[i].getAttribute("data-width")
              }%`;
            }
            bottomMargin -= elements[i].getAttribute("data-width");
            elements[i].remove();
            break;
          }
        }
        for (let i = 0; i < data.length; i++) {
          if (e.target.getAttribute("data-name") === data[i].name) {
            deleteNumToCalc(data[i]);
          }
        }
      }

      // Maybe Enough
      if (numOfGramms >= 1400 || numOfMoney >= 50 || numOfCalories >= 2500) {
        notice.classList.remove("_hide");
        notice.innerHTML = `<span>Maybe enough???</span>
        <img src="./img/icons/image216.png" alt="">`;
      } else {
        notice.classList.add("_hide");
      }
    });
  });
}

//Increse count
function addNumToCalc(data) {
  numOfMinutes += data.min;
  numOfGramms += data.gramm;
  numOfCalories += data.kcal;
  numOfMoney += data.price;
  timerOfMeal.textContent = `${numOfMinutes.toFixed(1)} min`;
  weightOfMeal.textContent = `${numOfGramms.toFixed(1)} gr`;
  caloriesOfMeal.textContent = `${numOfCalories.toFixed(1)} kcal`;
  costs.forEach((cost) => {
    cost.textContent = `$ ${numOfMoney.toFixed(1)}`;
  });
}

//Decrease count
function deleteNumToCalc(data) {
  numOfMinutes -= data.min;
  numOfGramms -= data.gramm;
  numOfCalories -= data.kcal;
  numOfMoney -= data.price;
  timerOfMeal.textContent = `${numOfMinutes.toFixed(1)} min`;
  weightOfMeal.textContent = `${numOfGramms.toFixed(1)} gr`;
  caloriesOfMeal.textContent = `${numOfCalories.toFixed(1)} kcal`;
  costs.forEach((cost) => {
    cost.textContent = `$ ${numOfMoney.toFixed(1)}`;
  });
}

//Put top bun
function putTopBun(data) {
  let newElement = document.createElement("img");
  newElement.src = `${data[0].img}`;
  newElement.classList.add("new__layer");
  newElement.classList.add("bun_top");
  newElement.style.zIndex = `${zIndex}`;
  newElement.style.bottom = `${bottomMargin + 10}%`;
  constructorField.prepend(newElement);

  let bunTimer = setTimeout(function () {
    checkoutPage.classList.remove("_hide");
  }, 2000);
}

//Delete top bun
function deleteTopBun() {
  let elements = document.querySelectorAll(".new__layer");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("bun_top")) {
      elements[i].remove();
    }
  }
}

// Add ketchup
function addKetchup() {
  ketchup.addEventListener("click", (e) => {
    e.preventDefault();
    numOfMoney += 1;
    numOfGramms += 50;
    numOfCalories += 55;
    costs.forEach((cost) => {
      cost.textContent = `$ ${numOfMoney.toFixed(1)}`;
    });
    weightOfMeal.textContent = `${numOfGramms.toFixed(1)} gr`;
    caloriesOfMeal.textContent = `${numOfCalories.toFixed(1)} kcal`;
  });
}

export {
  numOfMinutes,
  numOfGramms,
  numOfCalories,
  numOfMoney,
  checkoutPage,
  notice,
  putTopBun,
  deleteTopBun,
  addLayers,
  addKetchup,
};
