export const cart = () => {
  const buttonCart = document.getElementById("cart-button");
  const modalCart = document.querySelector(".modal-cart");
  const close = modalCart.querySelector(".close");
  const body = document.querySelector(".modal-body");
  const buttonSend = modalCart.querySelector(".button-primary");
  const cansel = modalCart.querySelector(".clear-cart");
  const sumPrice = document.querySelector(".modal-pricetag");
  const modalFooter = document.querySelector(".modal-footer");

  const resetCart = () => {
    body.innerHTML = "";
    localStorage.removeItem("cart");
    modalCart.classList.remove("is-open");
  };

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      sumPrice.innerHTML =
        cartArray.reduce((sum, item) => {
          return sum + item.price * item.count;
        }, 0) + " ₽";
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      sumPrice.innerHTML =
        cartArray.reduce((sum, item) => {
          return sum + item.price * item.count;
        }, 0) + " ₽";
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const renderItems = (data) => {
    body.innerHTML = "";

    data.forEach(({ name, price, id, count }) => {
      const cartElem = document.createElement("div");

      cartElem.classList.add("food-row");

      cartElem.innerHTML = `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price} ₽</strong>
        <div class="food-counter">
            <button class="counter-button btn-dec" data-index = "${id}">-</button>
            <span class="counter">${count}</span>
            <button class="counter-button btn-inc" data-index = "${id}">+</button>
        </div>
      `;

      body.append(cartElem);
    });
  };

  body.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("btn-inc")) {
      incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains("btn-dec")) {
      decrementCount(e.target.dataset.index);
    }
  });

  buttonSend.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart");
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  buttonCart.addEventListener("click", () => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    if (localStorage.getItem("cart")) {
      modalFooter.style.display = "flex";
      const cartArray = JSON.parse(localStorage.getItem("cart"));
      sumPrice.innerHTML =
        cartArray.reduce((sum, item) => {
          return sum + item.price * item.count;
        }, 0) + " ₽";
      renderItems(cartArray);
    } else {
      modalFooter.style.display = "none";
    }

    modalCart.classList.add("is-open");
  });

  close.addEventListener("click", () => {
    modalCart.classList.remove("is-open");
  });

  cansel.addEventListener("click", () => {
    resetCart();
  });
};
