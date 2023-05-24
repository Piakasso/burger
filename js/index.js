"use strict";

window.addEventListener("DOMContentLoaded", function (e) {
  const startMakeBurger = document.querySelectorAll("._start"),
    startPage = document.querySelector(".main-block__container"),
    constructor = document.querySelector(".constructor"),
    headerDiscoverLink = document.querySelector(".header__discover"),
    headerMakeBurgerLink = document.querySelector(".header__make-burger"),
    constructorField = document.querySelector(".constructor__burger"),
    ingredients = document.querySelectorAll(".ingredients__item"),
    timerOfMeal = document.querySelector("._clock span"),
    weightOfMeal = document.querySelector("._weight span"),
    caloriesOfMeal = document.querySelector("._calories span"),
    costs = document.querySelectorAll(".info__cost span"),
    deleteButtons = document.querySelectorAll(".item__remove"),
    notice = document.querySelector(".constructor__notice"),
    bunTop = document.querySelector(".bun_top"),
    checkoutButton = document.querySelector(".info__button"),
    checkoutPage = document.querySelector(".checkout"),
    closePopup = document.querySelector(".popup__header img"),
    popup = document.querySelector(".checkout__popup");

  // Activate first page

  function activateFirstPage() {
    startMakeBurger.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        headerMakeBurgerLink.classList.add("_active-link");
        headerDiscoverLink.classList.remove("_active-link");
        startPage.classList.add("_hide");
        constructor.classList.remove("_hide");
      });
    });

    headerDiscoverLink.addEventListener("click", (e) => {
      e.preventDefault();
      headerMakeBurgerLink.classList.remove("_active-link");
      headerDiscoverLink.classList.add("_active-link");
      startPage.classList.remove("_hide");
      constructor.classList.add("_hide");
    });
  }
  activateFirstPage();

  //Count add/remove ingredients
  let zIndex = 3;
  let bottomMargin = 0;
  let numOfMinutes = 0,
    numOfGramms = 50,
    numOfCalories = 90,
    numOfMoney = 0;

  ingredients.forEach((item) => {
    let counter = 0;

    item.addEventListener("click", (e) => {
      fetch("../data.json")
        .then((response) => response.json())
        .then((data) => {
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

                // Add calculator of calories

                function addNumToCalc() {
                  numOfMinutes += data[i].min;
                  numOfGramms += data[i].gramm;
                  numOfCalories += data[i].kcal;
                  numOfMoney += data[i].price;
                  timerOfMeal.textContent = `${numOfMinutes.toFixed(1)} min`;
                  weightOfMeal.textContent = `${numOfGramms.toFixed(1)} gr`;
                  caloriesOfMeal.textContent = `${numOfCalories.toFixed(
                    1
                  )} kcal`;
                  costs.forEach((cost) => {
                    cost.textContent = `$ ${numOfMoney.toFixed(1)}`;
                  });
                }
                addNumToCalc();
              }
            }
          }

          //Push delete buttons
          else if (e.target.classList.contains("item__remove")) {
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
            function deleteNumToCalc() {
              for (let i = 0; i < data.length; i++) {
                if (action.getAttribute("data-name") === data[i].name) {
                  numOfMinutes -= data[i].min;
                  numOfGramms -= data[i].gramm;
                  numOfCalories -= data[i].kcal;
                  numOfMoney -= data[i].price;

                  timerOfMeal.textContent = `${numOfMinutes.toFixed(1)} min`;
                  weightOfMeal.textContent = `${numOfGramms.toFixed(1)} gr`;
                  caloriesOfMeal.textContent = `${numOfCalories.toFixed(
                    1
                  )} kcal`;
                  costs.forEach((cost) => {
                    cost.textContent = `$ ${numOfMoney.toFixed(1)}`;
                  });
                }
              }
            }
            deleteNumToCalc();
            if (counter <= 0) {
              counter = 0;
              action.nextElementSibling.textContent = "0";
              action.classList.add("_disabled");
            } else if (counter > 0) {
            }
          }
          // Maybe Enough

          if (
            numOfGramms >= 1600 ||
            numOfMoney >= 70 ||
            numOfCalories >= 2800
          ) {
            notice.classList.remove("_hide");
          } else {
            notice.classList.add("_hide");
          }
        });
    });
  });

  //Checkout button
  function deleteTopBun() {
    let elements = document.querySelectorAll(".new__layer");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains("bun_top")) {
        elements[i].remove();
      }
    }
  }
  checkoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (numOfMoney < 4 && numOfMoney > 0) {
      notice.classList.remove("_hide");
      notice.innerHTML = ` <span>Minimum  order 4$</span>
      <img src="./img/icons/monkey.png" alt="">
`;
    } else if (numOfMoney == 0) {
      notice.classList.remove("_hide");
      notice.innerHTML = ` <span>Invisible burger....Hmmmm...</span>
    <img src="./img/icons/hmm.png" alt="">
`;
    } else {
      let newElement = document.createElement("img");
      newElement.src = "../img/burger-ingredients/bun_top.png";
      newElement.classList.add("new__layer");
      newElement.classList.add("bun_top");
      newElement.style.zIndex = `${zIndex++}`;
      newElement.style.bottom = `${bottomMargin + 10}%`;
      constructorField.prepend(newElement);

      let bunTimer = setTimeout(function () {
        checkoutPage.classList.remove("_hide");
      }, 2000);
    }
  });

  checkoutPage.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target == closePopup || e.target === checkoutPage) {
      checkoutPage.classList.add("_hide");
      deleteTopBun();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (checkoutPage && e.key === "Escape") {
      checkoutPage.classList.add("_hide");
      deleteTopBun();
    }
  });
});
