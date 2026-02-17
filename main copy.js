import PocketBase from "./pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");
console.log("main.js loaded");
/*
async function getIpDetails() {
  const token = "b54498c78e4bf6";
  const url = `https://api.ipinfo.io/lite/me?token=${token}`;

  try {
    // const response = await fetch(url);
    // const data = await response.json();
    return {

      ip: data.ip,
      country: data.country,
      country_code: data.country_code,
      as_domain: data.as_domain,
    };
  } catch (e) {
    console.error("Fetch failed", e);
  }
}

*/

//for offline work

async function filecreate (e){
      const response = await pb.send("/api/register", {
      method: "POST",
      body: {
        id: e,
      },
    });
    
}

async function registerUser(email, password, name) {
  let encodeid = encodeToHex(email);
  try {
    const data = {
      email: email,
      password: password,
      passwordConfirm: password, // Must match the password
      name: name,
      spdf:encodeid,
    };
    filecreate(encodeid);

    const record = await pb.collection("users").create(data);

    console.log("User registered successfully:", record);
    console.log(record.id);
    loginfunction(email, password);
    return record;
    

  } catch (e) {
    return console.log("user loging in failed");
  }
}

// registerUser("kalamanickg@gmail.com", "testtesttest", "Alok");

async function getIpDetails() {
  const token = "b54498c78e4bf6";
  const url = `https://api.ipinfo.io/lite/me?token=${token}`;

  try {
    // const response = await fetch(url);
    // const data = await response.json();
    return {
      ip: "offline",
      asn: "AS24389",
      as_name: "GrameenPhone Ltd.",
      as_domain: "grameenphone.com",
      country_code: "BD",
      country: "offline",
      continent_code: "AS",
      continent: "Asia",
    };
  } catch (e) {
    console.error("Fetch failed", e);
  }
}

const fullURLString = window.location.href;
const urlObject = new URL(fullURLString);
const baseURL = urlObject.origin;





const decodeFromHex = (hex) => {
  const bytes = new Uint8Array(
    hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
  );
  return new TextDecoder().decode(bytes);
};

const testsub = pb.authStore.model.spdf
console.log(testsub)
console.log("testing", testsub); 






async function senddata() {
  const ipData = await getIpDetails(); // Now it's stored in 'ipData'
  // let ipData =
  const response = await pb.send("/api/try", {
    method: "POST",
    body: {
      from: testsub,
      ip: ipData.ip,
      url: window.location.href,
      agent: navigator.userAgent,
      country: ipData.country,
      country_code: ipData.country_code,
      as_domain: ipData.as_domain,
    },
  });
  // document.querySelector(".test").textContent = JSON.stringify(response);
}

senddata(testsub);

// console.log(new Date().toLocaleString());

// console.log(window.location.href);
// console.log(navigator);

let clickable = document.querySelectorAll(
  ".homeLink, .pagesLink, .trashLink, .settingsLink"
);

clickable.forEach((item) => {
  item.addEventListener("click", (e) => {
    selectPosition(e.currentTarget);
  });
});

//testing

// let visitDiv = document.querySelector(".visits");
// async function loadVisits(cname) {
//   const records = await pb.collection(cname).getList(1, 50, {
//     sort: "-created",
//   });
//   console.log(records);
//   const recorditem = records.items;
//   visitDiv.innerHTML = "";
//   recorditem.forEach((record) => {
//     let recordElem = document.createElement("div");
//     recordElem.classList.add("record");
//     recordElem.innerHTML = `
//       <p><strong>IP:</strong> ${record.ip}</p>
//       <p><strong>Country:</strong> ${record.country} (${
//       record.country_code
//     })</p>
//       <p><strong>AS Domain:</strong> ${record.as_domain}</p>
//       <p><strong>Agent:</strong> ${record.agent}</p>
//       <p><strong>Time:</strong> ${new Date(record.time).toLocaleString()}</p>
//       <hr/>
//     `;
//     visitDiv.appendChild(recordElem);
//   });
// }

// loadVisits(testsub);




async function filecreate (e){
      const response = await pb.send("/api/register", {
      method: "POST",
      body: {
        id: e,
      },
    });
    
}


async function registerUser(email, password, name) {
  let encodeid = encodeToHex(email);
  try {
    const data = {
      email: email,
      password: password,
      passwordConfirm: password, // Must match the password
      name: name,
      spdf:encodeid,
    };
    filecreate(encodeid);
    const record = await pb.collection("users").create(data);

    console.log("User registered successfully:", record);
    console.log(record.id);
    loginfunction(email, password);
    return record;
    

  } catch (e) {
    return console.log("user logged in ig");
  }
}

registerUser("skkajsmkg@gmail.com", "testtesttest", "Alok");



// async function sendTestRequest(event) {
//   if (event) {
//         event.preventDefault();
//         event.stopPropagation();
//     }
//     try {
//   await pb.send("/api/create-file", {
    
//     method: "POST",
//     body: {
//       filename: "alook.txt",
//       content: "This is a test content for the file."
//     },  
//   }).then(response => {
//     console.log("File creation response:", response);
//   }).catch(error => {
//     console.error("Error creating file:", error);
//   }
//   );
// } catch (err) {
//     console.log("Error in sendTestRequest:", err);

// }}
// sendTestRequest();

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











































let homeLink = document.querySelector(".homeLink");
let pagesLink = document.querySelector(".pagesLink");
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

window.addEventListener("resize", () => {
  console.log("Window resized");
});
