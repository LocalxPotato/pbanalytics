import PocketBase from "./pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");

console.log("main.js loaded");

const encodeToHex = (str) => {
  return Array.from(new TextEncoder().encode(str))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

let userspdf = pb.authStore.model.spdf;
let greet = document.querySelector(".greet h3")
greet.innerHTML = pb.authStore.model.name
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
function getdevice(){
  let width = window.innerWidth
  let height = window.innerHeight
  console.log(width ,height)
  if (width>1000){
    return "computer"
  }else if(width>768){
    return "tab"
  }else {
    return "phone"
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


const days = document.querySelectorAll(".tpageview > div > div p:nth-child(1)");
const countryContainer = document.querySelector(".countries > div");
const linkContainer = document.querySelector(".rightside");

async function getWeeklySummary(collectionName) {
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const sunday = new Date();
  sunday.setHours(0, 0, 0, 0);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  const filterDate = sunday.toISOString().replace("T", " ").split(".")[0];



  try {
    const records = await pb.collection(collectionName).getFullList({
      filter: `created >= "${filterDate}"`,
      fields: "created,country,url",
    });
    const { countryCounts, linkCounts } = records.reduce(
      (acc, record) => {
        const c = record.country || "Unknown";
        const u = record.url || "No URL";
        acc.countryCounts[c] = (acc.countryCounts[c] || 0) + 1;
        acc.linkCounts[u] = (acc.linkCounts[u] || 0) + 1;
        return acc;
      },
      { countryCounts: {}, linkCounts: {} }
    );

    // Helper: Convert object to sorted HTML string
    const getSortedHTML = (obj) =>
      Object.entries(obj)
        .sort(([, a], [, b]) => b - a)
        .map(
          ([key, val]) => `
                <div>
                    ${
                      key.startsWith("http")
                        ? `<a href="${key}">${key}</a>`
                        : `<p>${key}</p>`
                    }
                    <p>${val}</p>
                </div>`
        )
        .join("");

    // Batch DOM updates
    linkContainer.innerHTML += getSortedHTML(linkCounts);
    countryContainer.innerHTML = getSortedHTML(countryCounts);

    // Initialize counts with 0s
    const summary = dayNames.reduce((acc, day) => ({ ...acc, [day]: 0 }), {});

    // Populate counts
    records.forEach((record) => {
      const dayName = dayNames[new Date(record.created).getDay()];
      summary[dayName]++;
    });

    // Update DOM efficiently
    days.forEach((el) => {
      const dayKey = el.className.toLowerCase(); // Ensure match
      if (dayKey in summary) {
        el.textContent = summary[dayKey];
      }
    });

    console.table(summary);
  } catch (error) {
    console.error("Weekly Summary Error:", error);
  }
}
async function getMonthlySummary(collectionName) {
  // 1. Get start of current month (YYYY-MM-01 00:00:00)
  const startOfMonth = new Date();
  startOfMonth.setDate(1); // Set to the 1st day
  startOfMonth.setHours(0, 0, 0, 0);

  // Formatting for PocketBase filter (e.g., "2023-10-01 00:00:00")
  const filterDate = startOfMonth.toISOString().replace("T", " ").split(".")[0];

  try {
    const records = await pb.collection(collectionName).getFullList({
      filter: `created >= "${filterDate}"`,
      fields: "created,country,url",
    });

    // Country and Link grouping (remains the same)
    const { countryCounts, linkCounts } = records.reduce(
      (acc, record) => {
        const c = record.country || "Unknown";
        const u = record.url || "No URL";
        acc.countryCounts[c] = (acc.countryCounts[c] || 0) + 1;
        acc.linkCounts[u] = (acc.linkCounts[u] || 0) + 1;
        return acc;
      },
      { countryCounts: {}, linkCounts: {} }
    );

    // Helper: Convert object to sorted HTML string
    const getSortedHTML = (obj) =>
      Object.entries(obj)
        .sort(([, a], [, b]) => b - a)
        .map(
          ([key, val]) => `
                <div>
                    ${
                      key.startsWith("http")
                        ? `<a href="${key}">${key}</a>`
                        : `<p>${key}</p>`
                    }
                    <p>${val}</p>
                </div>`
        )
        .join("");

    // Batch DOM updates
    linkContainer.innerHTML = getSortedHTML(linkCounts); // Changed += to = to refresh properly
    countryContainer.innerHTML = getSortedHTML(countryCounts);

    // 2. Summary by Day of Month (1, 2, 3...)
    // We initialize an object for all days in the current month
    const lastDay = new Date(
      startOfMonth.getFullYear(),
      startOfMonth.getMonth() + 1,
      0
    ).getDate();
    const summary = {};
    for (let i = 1; i <= lastDay; i++) {
      summary[i] = 0;
    }

    // Populate counts
    records.forEach((record) => {
      const dayOfMonth = new Date(record.created).getDate();
      summary[dayOfMonth]++;
    });

    // 3. Update DOM
    // Assuming your 'days' elements now represent the date numbers or have matching classes
    days.forEach((el) => {
      const dayKey = parseInt(el.className.replace(/\D/g, "")); // Extracts number from class like "day-15"
      if (dayKey in summary) {
        el.textContent = summary[dayKey];
      }
    });

    console.log(
      `Summary for ${startOfMonth.toLocaleString("default", {
        month: "long",
      })}:`
    );
    console.table(summary);
  } catch (error) {
    console.error("Monthly Summary Error:", error);
  }
}

// Execute
getWeeklySummary(userspdf);
