var mode = "alook";

let switchmode = document.querySelectorAll(".switchmode  p");
let login = document.querySelector(".login");
let regi = document.querySelector(".regi");
let span = document.querySelector(".switchmode span");

switchmode.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("login")) {
        console.log("Login mode selected");
      mode = "login";
      span.style.left = "0";
      item.classList.add("active");
      regi.classList.remove("active");
    } else {
        console.log("Register mode selected");
        item.classList.add("active");
        login.classList.remove("active");
      mode = "register";
      span.style.left = "50%";
    }
  });
});


