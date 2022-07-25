export const auth = () => {
  const buttonAuth = document.querySelector(".button-auth");
  const modalAuth = document.querySelector(".modal-auth");
  const buttonOut = document.querySelector(".button-out");
  const userName = document.querySelector(".user-name");
  const closeAuth = document.querySelector(".close-auth");
  const logInForm = document.getElementById("logInForm");
  const inputLogin = document.getElementById("login");
  const inputPassword = document.getElementById("password");
  const buttonCart = document.querySelector(".button-cart");

  const login = (user) => {
    buttonAuth.style.display = "none";
    buttonOut.style.display = "flex";
    buttonCart.style.display = "flex";
    userName.style.display = "flex";
    userName.textContent = user.login;
    modalAuth.style.display = "none";
  };

  const logout = () => {
    buttonAuth.style.display = "flex";
    buttonOut.style.display = "none";
    buttonCart.style.display = "none";
    userName.textContent = "";
    userName.style.display = "none";

    localStorage.removeItem("user");
  };

  buttonAuth.addEventListener("click", () => {
    modalAuth.style.display = "flex";
  });

  closeAuth.addEventListener("click", () => {
    modalAuth.style.display = "none";
  });

  buttonOut.addEventListener("click", () => {
    logout();
  });

  logInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };

    if (user.login.length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
      login(user);
    } else {
      alert("Введите логин и пароль");
    }
  });

  if (localStorage.getItem("user")) {
    login(JSON.parse(localStorage.getItem("user")));
  }
};
