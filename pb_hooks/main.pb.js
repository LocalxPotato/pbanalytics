routerAdd("POST", "/api/register", (e) => {
  const data = e.requestInfo().body;

    function createCollection(cname) {
    const collection = new Collection({
      name: cname,
      type: "base",
      listRule: "@request.auth.id != ''",
      viewRule: "",
      createRule: "",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        {
          name: "ip",
          type: "text",
          required: true,
        },
        {
          name: "as_domain",
          type: "text",
        },
        {
          name: "country_code",
          type: "text",
        },
        {
          name: "country",
          type: "text",
        },
        {
          name: "agent",
          type: "text",
        },
        {
          name: "url",
          type: "url",
        },
        {
          name: "from",
          type: "url",
        },
        {
          name: "time",
          type: "date",
          required: true,
          // These properties handle the "auto" logic
        },
        {
          name: "created", // The field from your new screenshot
          type: "autodate",
          required: true,
          // Dashboard "Create/Update" = both set to true
          onCreate: true,
          onUpdate: false,
        },
        {
          name: "updated", // The field from your new screenshot
          type: "autodate",
          required: true,
          // Dashboard "Create/Update" = both set to true
          onCreate: true,
          onUpdate: true,
        },
      ],
    });
    console.log(`Creating collection: ${cname}`);
    $app.save(collection);
  }
  const ensureCollection = (cname) => {

    try {
      createCollection(cname)
    } catch (err) {
      return console.log("creating failed")
    }
  };
  ensureCollection(data.id);
  console.log(`Collection ${JSON.stringify(data.id)} is ready.`);

  try {
    const filename = `${data.id}.js`;
    const content = `
    import PocketBase from "./pocketbase.es.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");


let userspdf = "${data.id}"

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
senddata();`;
    const filePath = __hooks + "/../scripts/" + filename;
    let fileExists = false;

    try {
      const info = $os.stat(filePath);
      if (info) {
        fileExists = true;
      }
    } catch (statErr) {
      fileExists = false;
    }

    if (fileExists) {
      return e.json(200, { message: "File already exists", path: filePath });
    } else {
      console.log(`File created at ${filePath} with content: ${content}`);

      $os.writeFile(filePath, content, 420);
      return e.json(201, { message: "Created", path: filePath });
    }
  } catch (err) {
    return e.json(500, { success: false, error: err.message });
  }
}); /// <reference path="..\pb_data\types.d.ts" />

// routerAdd("POST", "/api/try", (c) => {
//     // let courseId = JSON.stringify(c.event.request.url.rawQuery).slice(3,-1)
//     // let user = JSON.stringify(c.auth.id)
//     console.log(JSON.stringify(c.event.request.url.rawQuery).slice(3,-1))

// const records = $app.findRecordsByFilter(
//         "visits",   // collection name
//         "1=1",    // filter (1=1 gets everything)
//         "-created", // sort by newest first
//         50        // limit to 50 items
//     );

//     console.log(records)

// //  console.log(JSON.stringify(records))

// })

routerAdd("POST", "/api/try", (e) => {
  // 1. Get the IP Address
  console.log("Received request for /api/try");
  function adddata(e) {
    const collection = $app.findCollectionByNameOrId(e);
    const record = new Record(collection);

    record.set("ip", data.ip || "Default IP");
    record.set("url", data.url || "Default URL");
    record.set("from", data.from || "Default URL");
    record.set("time", new Date().toISOString() || "Default Title");
    record.set("agent", data.agent || "Default Agent");
    record.set("country", data.country || "Default Country");
    record.set("country_code", data.country_code || "Default Country Code");
    record.set("as_domain", data.as_domain || "Default AS Domain");

    $app.save(record);
  }
  function createCollection(cname) {
    const collection = new Collection({
      name: cname,
      type: "base",
      listRule: "@request.auth.id != ''",
      viewRule: "",
      createRule: "",
      updateRule: "@request.auth.id != ''",
      deleteRule: null,
      fields: [
        {
          name: "ip",
          type: "text",
          required: true,
        },
        {
          name: "as_domain",
          type: "text",
        },
        {
          name: "country_code",
          type: "text",
        },
        {
          name: "country",
          type: "text",
        },
        {
          name: "agent",
          type: "text",
        },
        {
          name: "url",
          type: "url",
        },
        {
          name: "from",
          type: "url",
        },
        {
          name: "time",
          type: "date",
          required: true,
          // These properties handle the "auto" logic
        },
        {
          name: "created", // The field from your new screenshot
          type: "autodate",
          required: true,
          // Dashboard "Create/Update" = both set to true
          onCreate: true,
          onUpdate: false,
        },
        {
          name: "updated", // The field from your new screenshot
          type: "autodate",
          required: true,
          // Dashboard "Create/Update" = both set to true
          onCreate: true,
          onUpdate: true,
        },
      ],
    });
    console.log(`Creating collection: ${cname}`);
    $app.save(collection);
  }
  function checkCollectionExists(cname) {
    try {

      const collection = $app.findCollectionByNameOrId(cname);

      if (collection) {
        console.log("Collection found: " + cname);
        adddata(cname);
        console.log("data added");
        return true;
      }
    } catch (e) {
      createCollection(cname);
      console.log("create new collection done");
      checkCollectionExists(cname);
      return console.log("Collection not found: " + cname);
    }

    console.log("false");
    // console.log(data.from);

    console.log("checking again"); // Log "false" as requested

    return false;
  }
  const data = e.requestInfo().body;
  checkCollectionExists(data.for);

  return e.json(200, { status: "OK", respo: data });
});
routerAdd("GET", "/hello", (e) => {
  return e.json(200, { message: "hello!" });
});
routerAdd("GET", "/", (e) => {
  return e.json(200, { message: "hello!" });
});

$app.rootCmd.addCommand(
  new Command({
    use: "hello",
    run: (cmd, args) => {
      console.log("Hello world!");
    },
  })
);
