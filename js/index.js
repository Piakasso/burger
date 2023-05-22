"use strict";

window.addEventListener("DOMContentLoaded", function (e) {
  const startMakeBurger = document.querySelectorAll("._start"),
    mainButton = document.querySelectorAll(".main-block__button"),
    startPage = document.querySelector(".main-block__container"),
    constructor = document.querySelector(".constructor"),
    headerDiscoverLink = document.querySelector(".header__discover"),
    headerMakeBurgerLink = document.querySelector(".header__make-burger"),
    bgBurger = document.querySelector(".main-block__burger"),
    constructorField = document.querySelector(".constructor__burger"),
    ingredients = document.querySelectorAll(".ingredients__item"),
    buttonsAdd = document.querySelectorAll(".item__add");

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

  ingredients.forEach((item) => {
    let counter = 0;

    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("item__add")) {
        let action = e.target;
        counter += 1;
        action.previousElementSibling.textContent = `${counter}`;
      } else if (e.target.classList.contains("item__remove")) {
        let action = e.target;
        counter -= 1;
        action.nextElementSibling.textContent = `${counter}`;
        if (counter <= 0) {
          action.nextElementSibling.textContent = "0";
        }
      }
    });
  });
  let zIndex = 3;
  let bottom = 0;
  buttonsAdd.forEach((item) => {
    item.addEventListener("click", (e) => {
      let newElement = document.createElement("img");
      //   fetch("../data.json")
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log(data);
      //       newElement.src = `../img/burger-ingredients/${e.target.getAttribute(
      //         "data-name"
      //       )}.png`;
      //     });

      if (
        e.target.getAttribute("data-name") == "cutlet" ||
        e.target.getAttribute("data-name") == "bun_middle"
      ) {
        newElement.classList.add(`new__layer${zIndex - 2}`);
        newElement.classList.add("new__layer");
        newElement.style.zIndex = `${zIndex++}`;
        newElement.style.bottom = `${(bottom += 5)}%`;
        constructorField.prepend(newElement);
      } else {
        newElement.classList.add(`new__layer${zIndex - 2}`);
        newElement.classList.add("new__layer");
        newElement.style.zIndex = `${zIndex++}`;
        newElement.style.bottom = `${(bottom += 1.5)}%`;
        constructorField.prepend(newElement);
      }
    });
  });
});
