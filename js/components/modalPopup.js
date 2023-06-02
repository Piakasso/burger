import { checkoutPage, deleteTopBun, numOfMinutes } from "./putIngredients.js";

const closePopup = document.querySelector(".popup__header img"),
  popup = document.querySelector(".checkout__popup"),
  popupButtons = document.querySelector(".popup__buttons");

//Hide Checkout page
function hideCheckoutPage() {
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
}

//Confirm order
function confirmOrder() {
  popupButtons.addEventListener("click", (e) => {
    if (e.target.classList.contains("_submit")) {
      popup.innerHTML = `<div class='checkout__success'>
            Your order will prepairing during ${numOfMinutes.toFixed(
              0
            )} min. Enjoy your meal
            </div>
            `;

      const reload = setTimeout(function () {
        location.reload();
      }, 3000);
    } else if (e.target.classList.contains("_cancel")) {
      checkoutPage.classList.add("_hide");
      deleteTopBun();
    }
  });
}

export { hideCheckoutPage, confirmOrder };
