import PocketBase from "./pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");
console.log("main.js loaded");

const encodeToHex = (str) => {
  return Array.from(new TextEncoder().encode(str))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
};

let userspdf = pb.authStore.model.spdf

console.log(userspdf);
//<--------------------send data-------------------->

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
async function senddata() {
  const ipData = await getIpDetails(); // Now it's stored in 'ipData'
  // let ipData =
  const response = await pb.send("/api/try", {
    method: "POST",
    body: {
      for: userspdf,
      from: window.location.origin,
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
senddata();


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

// registerUser("klasmkg@gmail.com", "testtesttest", "Alok");


















































