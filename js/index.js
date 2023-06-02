"use strict";

import {
  addKetchup,
  numOfMoney,
  notice,
  addLayers,
  putTopBun,
  numOfMinutes,
} from "./components/putIngredients.js";

import { hideCheckoutPage, confirmOrder } from "./components/modalPopup.js";

// Fake database
const data = [
  {
    name: "bun_top",
    kcal: 120,
    gramm: 50,
    price: 1,
    min: 3,
    img: "img/burger-ingredients/bun_top.png",
    width: 0,
  },
  {
    name: "bun_bottom",
    kcal: 90,
    gramm: 50,
    price: 1,
    min: 3,
    img: "img/burger-ingredients/bun_bottom.png",
    width: 6,
  },
  {
    name: "cutlet",
    kcal: 249,
    gramm: 100,
    price: 4.3,
    min: 3,
    img: "img/burger-ingredients/cutlet.png",
    width: 4,
  },
  {
    name: "mayo",
    kcal: 120,
    gramm: 50,
    price: 1.4,
    min: 0.5,
    img: "img/burger-ingredients/mayo.png",
    width: 1,
  },
  {
    name: "onion",
    kcal: 50,
    gramm: 30,
    price: 1.1,
    min: 0.3,
    img: "img/burger-ingredients/onion.png",
    width: 1,
  },
  {
    name: "tomato",
    kcal: 60,
    gramm: 70,
    price: 1,
    min: 0.5,
    img: "img/burger-ingredients/tomato.png",
    width: 5.5,
  },
  {
    name: "cucumber",
    kcal: 70,
    gramm: 70,
    price: 1,
    min: 1,
    img: "img/burger-ingredients/cucumber.png",
    width: 1,
  },
  {
    name: "cheese",
    kcal: 90,
    gramm: 50,
    price: 1,
    min: 0.4,
    img: "img/burger-ingredients/cheese.png",
    width: 1,
  },
  {
    name: "salad",
    kcal: 40,
    gramm: 15,
    price: 1,
    min: 1.2,
    img: "img/burger-ingredients/salad.png",
    width: 4,
  },
  {
    name: "bun_middle",
    kcal: 120,
    gramm: 50,
    price: 1,
    min: 1,
    img: "img/burger-ingredients/bun_middle.png",
    width: 10,
  },
];

window.addEventListener("DOMContentLoaded", function () {
  const startMakeBurger = document.querySelectorAll("._start"),
    startPage = document.querySelector(".main-block__container"),
    constructor = document.querySelector(".constructor"),
    headerDiscoverLink = document.querySelector(".header__discover"),
    headerMakeBurgerLink = document.querySelector(".header__make-burger"),
    footerMobile = document.querySelector(".footer__mobile"),
    checkoutButtons = document.querySelectorAll(".info__button");

  // Activate first page
  function activateFirstPage() {
    startMakeBurger.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        headerMakeBurgerLink.classList.add("_active-link");
        headerDiscoverLink.classList.remove("_active-link");
        startPage.classList.add("_hide");
        constructor.classList.remove("_hide");
        footerMobile.classList.remove("_hide");
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

  addLayers(data);

  addKetchup();

  //Checkout button

  checkoutButtons.forEach((checkoutButton) => {
    checkoutButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (numOfMoney < 5 && numOfMoney > 0) {
        notice.classList.remove("_hide");
        notice.innerHTML = ` <span>Minimum  order 5$</span>
        <img src="./img/icons/monkey.png" alt="">
  `;
      } else if (numOfMoney == 0) {
        notice.classList.remove("_hide");
        notice.innerHTML = ` <span>Invisible burger....Hmmmm...</span>
      <img src="./img/icons/hmm.png" alt="">
  `;
      } else {
        putTopBun(data);
      }
    });
  });

  hideCheckoutPage();
  confirmOrder(numOfMinutes);
});
