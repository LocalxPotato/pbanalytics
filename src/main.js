import PocketBase from "./pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");

console.log("main.js loaded");

const encodeToHex = (str) => {
  return Array.from(new TextEncoder().encode(str))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

let userspdf = pb.authStore.model.spdf;
let greet = document.querySelector(".greet h3");
greet.innerHTML = pb.authStore.model.name;
console.log(pb.authStore.model);
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
function getdevice() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  console.log(width, height);
  if (width > 1000) {
    return "computer";
  } else if (width > 768) {
    return "tab";
  } else {
    return "phone";
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

// const canvas = document.getElementById('myChart');

class SteppedChart {
  constructor(canvasId, config) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.config = config;
    let pdsize = 70;
    this.padding = {
      top: pdsize,
      right: pdsize,
      bottom: pdsize,
      left: pdsize,
    };
    this.drawProgress = 0;
    this.targetIndex = 0;
    this.easedIndex = 0;
    this.isHovering = false;
    this.opacity = 0;

    this.init();
  }

  init() {
    // Create Diagonal Pattern
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 10;
    pCanvas.height = 10;
    const pCtx = pCanvas.getContext("2d");
    pCtx.strokeStyle = "#f0f0f0";
    pCtx.lineWidth = 1;
    pCtx.beginPath();
    pCtx.moveTo(0, 10);
    pCtx.lineTo(10, 0);
    pCtx.stroke();
    this.pattern = this.ctx.createPattern(pCanvas, "repeat");

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();

      // pain is the ass
      // now competable with css
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;

      // Apply the scale to the mouse coordinates
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      if (
        mouseX >= this.padding.left &&
        mouseX <= this.canvas.width - this.padding.right
      ) {
        this.isHovering = true;
        this.targetIndex =
          ((mouseX - this.padding.left) /
            (this.canvas.width - this.padding.left - this.padding.right)) *
          (this.config.dataSolid.length - 1);
      } else {
        this.isHovering = false;
      }
    });

    this.canvas.addEventListener("mouseleave", () => (this.isHovering = false));

    this.animate();
  }

  getX(i) {
    const chartWidth =
      this.canvas.width - this.padding.left - this.padding.right;
    return (
      this.padding.left + i * (chartWidth / (this.config.dataSolid.length - 1))
    );
  }

  getY(val) {
    const chartHeight =
      this.canvas.height - this.padding.top - this.padding.bottom;
    return (
      this.canvas.height -
      this.padding.bottom -
      val * (chartHeight / this.config.maxData) * this.drawProgress
    );
  }

  updateData(solid, dashed) {
    this.config.dataSolid = solid;
    this.config.dataDashed = dashed;
    this.drawProgress = 0;
  }

  drawPath(data) {
    for (let i = 0; i < data.length; i++) {
      const x = this.getX(i),
        y = this.getY(data[i]);
      if (i === 0) this.ctx.moveTo(x, y);
      else {
        const prevX = this.getX(i - 1),
          prevY = this.getY(data[i - 1]),
          midX = (prevX + x) / 2;
        this.ctx.bezierCurveTo(midX, prevY, midX, y, x, y);
      }
    }
  }

  animate() {
    const { ctx, canvas, padding, config } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.drawProgress < 1)
      this.drawProgress += (1 - this.drawProgress) * 0.08;

    // 1. Grid
    ctx.setLineDash([]);
    ctx.strokeStyle = "#00000010";
    ctx.fillStyle = "#bbb";
    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const val = Math.round(i * (config.maxData / 4));
      const y =
        canvas.height -
        padding.bottom -
        val * ((canvas.height - padding.top - padding.bottom) / config.maxData);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);
      ctx.stroke();
      ctx.fillText(val, padding.left - 15, y + 4);
    }

    // 2. Area & Lines
    ctx.beginPath();
    ctx.moveTo(this.getX(0), canvas.height - padding.bottom);
    this.drawPath(config.dataSolid);
    ctx.lineTo(
      this.getX(config.dataSolid.length - 1),
      canvas.height - padding.bottom
    );
    // ctx.fillStyle = this.pattern; ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    this.drawPath(config.dataSolid);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#333";
    ctx.setLineDash([5, 5]);
    this.drawPath(config.dataDashed);
    ctx.stroke();

    // 3. X-Axis Labels
    ctx.setLineDash([]);
    ctx.fillStyle = "#999";
    ctx.textAlign = "center";
    config.labels.forEach((label, i) =>
      ctx.fillText(label, this.getX(i), canvas.height - padding.bottom + 25)
    );

    // 4. Interaction
    this.easedIndex += (this.targetIndex - this.easedIndex) * 0.15;
    this.opacity +=
      (this.isHovering ? 1 - this.opacity : 0 - this.opacity) * 0.15;

    if (this.opacity > 0.01) {
      ctx.globalAlpha = this.opacity;
      const activeX = this.getX(this.easedIndex);
      const snapIdx = Math.round(this.easedIndex);

      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#aaa";
      
      ctx.moveTo(activeX, padding.top);
      ctx.lineTo(activeX, canvas.height - padding.bottom);
      ctx.stroke();

      const tipX =
        activeX + 20 > canvas.width - 120 ? activeX - 135 : activeX + 15;
      ctx.setLineDash([]);
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.roundRect(tipX, 100, 120, 60, 8);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "left";
      ctx.fillText(config.labels[snapIdx], tipX + 12, 120);
      ctx.font = " 13px monospace";
      ctx.fillStyle = "#aaa";
      ctx.fillText(
        `Views: ${Math.round(config.dataSolid[snapIdx] * this.drawProgress)}`,
        tipX + 12,
        137
      );
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(() => this.animate());
  }
}

const days = document.querySelectorAll(".tpageview > div > div p:nth-child(1)");
const countryContainer = document.querySelector(".countries > div");
const linkContainer = document.querySelector(".rightside");
const myChart = new SteppedChart("myChart", {
  maxData: 100,
  labels: ["", "", "", "", "", "", ""], // Will be updated by getWeeklySummary
  dataSolid: [0, 0, 0, 0, 0, 0, 0],
  dataDashed: [0, 0, 0, 0, 0, 0, 0],
});

async function getWeeklySummary(collectionName) {
  const now = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(now.getDate() - 14);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const filterDate = fourteenDaysAgo
    .toISOString()
    .replace("T", " ")
    .split(".")[0];
  const dayNamesShort = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const lastSevenDays = [];
  const currentWeekSummary = {}; // dataSolid
  const previousWeekSummary = {}; // dataDashed

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const name = dayNamesShort[d.getDay()];
    lastSevenDays.push(name);

    //start both from 0
    currentWeekSummary[name] = 0;
    previousWeekSummary[name] = 0;
  }

  try {
    const records = await pb.collection(collectionName).getFullList({
      filter: `created >= "${filterDate}"`,
      fields: "created,country,url",
    });

    const countryCounts = {};
    const linkCounts = {};

    records.forEach((record) => {
      const recordDate = new Date(record.created);
      const dayName = dayNamesShort[recordDate.getDay()];

      if (recordDate >= sevenDaysAgo) {
        if (dayName in currentWeekSummary) {
          currentWeekSummary[dayName]++;
        }

        // Metrics for UI (Only based on current week)
        const c = record.country || "Unknown";
        const u = record.url || "No URL";
        countryCounts[c] = (countryCounts[c] || 0) + 1;
        linkCounts[u] = (linkCounts[u] || 0) + 1;
      } else {
        // Previous 7 Days (Dashed Line)
        if (dayName in previousWeekSummary) {
          previousWeekSummary[dayName]++;
        }
      }
    });

    // 3. Update UI Elements
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

    linkContainer.innerHTML = getSortedHTML(linkCounts);
    countryContainer.innerHTML = getSortedHTML(countryCounts);

    // Update individual day <p> tags with current week data
    days.forEach((el) => {
      const dayKey = el.className.toLowerCase();
      if (dayKey in currentWeekSummary) {
        el.textContent = currentWeekSummary[dayKey];
      }
    });

    // 4. Update Chart
    const dataSolid = lastSevenDays.map((day) => currentWeekSummary[day]);
    const dataDashed = lastSevenDays.map((day) => previousWeekSummary[day]);

    myChart.config.labels = lastSevenDays.map(
      (d) => d.charAt(0).toUpperCase() + d.slice(1)
    );

    // Calculate max height based on both datasets
    const maxVal = Math.max(...dataSolid, ...dataDashed, 5);
    myChart.config.maxData = maxVal * 1.2;

    // Update chart with both arrays
    myChart.updateData(dataSolid, dataDashed);

    console.log("Current Week:", currentWeekSummary);
    console.log("Previous Week:", previousWeekSummary);
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
