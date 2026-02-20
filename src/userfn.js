import PocketBase from "./pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");


// let authinfo = document.querySelector(".authinfo");
// let authinfobutton = authinfo.querySelector("button");
// let authinfoparagraph = authinfo.querySelector("p");
// authinfobutton.addEventListener("click", async () => {
//   if (pb.authStore.isValid) {
//     authinfoparagraph.innerHTML = `info <br> ${JSON.stringify(pb.authStore.model, null, 2)} <br> <br> ${pb.authStore.model.email}`;
//   } else {
//     authinfoparagraph.textContent = "Not logged in";
//   }
// });


// let hardlog = document.querySelector(".hardlog");
// let login = document.querySelector(".login");
// let loginbutton = login.querySelector("button");

// hardlog.addEventListener("click", async () => {
//   console.log("Hardlog clicked");

//   await pb
//     .collection("users")
//     .authWithPassword("alok@gmail.com", "testtesttest");
// });



let loginfunction = async (email, password)=>{

    console.log(email, password);
    await pb
    .collection("users")
    .authWithPassword(email, password);
}
// loginfunction("skkajsmkg@gmail.com", "testtesttest")
// loginbutton.addEventListener("click", async ()=>{
//         let email = login.querySelector(".email").value;
//     let password = login.querySelector(".password").value;
//     await loginfunction(email, password);
// });

// let logininfo = document.querySelector(".logininfo");
// pb.authStore.onChange(() => {
//   if (pb.authStore.isValid) {
//     logininfo.innerHTML = `Logged in as: ${pb.authStore.model.email} `;
//   } else {
//     logininfo.textContent = "Not logged in";
//   }
// });


// let logout = document.querySelector(".logout");
// logout.addEventListener("click", async () => {
//   pb.authStore.clear();
//   logininfo.textContent = "Not logged in";
//     console.log("Logged out");
// });

// let register = document.querySelector(".register")
// let registerbtn = document.querySelector(".registerbtn")

// registerbtn.addEventListener("click", ()=>{
//   let email = register.querySelector(".email").value
//   let password = register.querySelector(".password").value
//   let name = register.querySelector(".name").value

//   registerUser(email, password, name)
// })
// //testing



let homeLink = document.querySelector(".homeLink");
let select = document.querySelector(".select");
function selectPosition(e) {
  let rect = e.getBoundingClientRect();
  console.log(rect);
  select.style.top = `${rect.top}px`;
}
document.addEventListener("DOMContentLoaded", () => {
  selectPosition(homeLink);

  console.log("DOM fully loaded and parsed");
  // You can safely access and manipulate DOM elements here
});

let route = (event) => {
  let href = event.currentTarget.getAttribute("href") || "#";
  event.preventDefault();
window.history.pushState({}, "", href);
  console.log("Navigated to:", href);
}
window.route = route


let clickable = document.querySelectorAll(
    ".links>a"
);

clickable.forEach((item) => {
  item.addEventListener("click", (e) => {
    route(e)

    selectPosition(e.currentTarget);
  });
});

let userinfo = document.querySelector(".usinfo");

function updateUserInfo() {
  if (pb.authStore.isValid) {
    console.log("User logged in:", pb.authStore.model.email);
    userinfo.querySelector(".name").textContent = pb.authStore.model.name;
    userinfo.querySelector(".email").textContent = pb.authStore.model.email;
  } else {
    console.log("User not logged in");
  }
}
updateUserInfo()



window.addEventListener("resize", () => {
  console.log("Window resized");
});











