
    import PocketBase from "./pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");


let userspdf = 6b616c616b6740676d61696c2e636f6d

async function getIpDetails() {
  const token = "b54498c78e4bf6";
  const url = "https://api.ipinfo.io/lite/me?token="+token;

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
}
senddata();