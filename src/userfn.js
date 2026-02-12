import PocketBase from "./pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");

let hardlog = document.querySelector(".hardlog");
let login = document.querySelector(".login");
let loginbutton = login.querySelector("button");

hardlog.addEventListener("click", async () => {
  console.log("Hardlog clicked");

  await pb
    .collection("users")
    .authWithPassword("alok@gmail.com", "testtesttest");
});



let loginfunction = async (email, password)=>{

    console.log(email, password);
    await pb
    .collection("users")
    .authWithPassword(email, password);
}
loginbutton.addEventListener("click", async ()=>{
        let email = login.querySelector(".email").value;
    let password = login.querySelector(".password").value;
    await loginfunction(email, password);
});

let logininfo = document.querySelector(".logininfo");
pb.authStore.onChange(() => {
  if (pb.authStore.isValid) {
    logininfo.textContent = `Logged in as: ${pb.authStore.model.email}`;
  } else {
    logininfo.textContent = "Not logged in";
  }
});


let logout = document.querySelector(".logout");
logout.addEventListener("click", async () => {
  pb.authStore.clear();
  logininfo.textContent = "Not logged in";
    console.log("Logged out");
});

//testing
