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

  function adddata(e) {
    const collection = $app.findCollectionByNameOrId(e);
    const record = new Record(collection);

    record.set("ip", data.ip || "Default IP");
    record.set("url", data.url || "Default URL");
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

    $app.save(collection);
  }
  function checkCollectionExists(cname) {
    try {
      // This will find the collection or throw an error/return null
      // depending on the internal VM state.
      const collection = $app.findCollectionByNameOrId(cname);

      if (collection) {
        console.log("Collection found: " + cname);
        adddata(cname);
        console.log("data added");
        return true;
      }
    } catch (e) {
          createCollection(data.from);
    console.log("create done");
    checkCollectionExists(data.from);
      return console.log("Collection not found: " + cname);

    }

    console.log("false");
    console.log(data.from);

    console.log("checking again"); // Log "false" as requested

    return false;
  }
  const data = e.requestInfo().body;
  checkCollectionExists(data.from);

  return e.json(200, { status: "OK", respo: data });
});
routerAdd("GET", "/hello", (e) => {
  return e.json(200, { message: "hello!" });
});
routerAdd("GET", "/", (e) => {
  return e.json(200, { message: "hello!" });
});

routerAdd("POST", "/api/regisr", (e) => {
    // 1. Get request body
    const data = e.requestInfo().body;

    // Helper function to create a collection if needed

    // 2. File System Logic

    // try {
    //     // Create directory and write file
    //     $os.mkdirAll("./", 0o777);
    //     $os.writeFile("./", "fileinfo", 0o644);

    //     console.log(`Successfully generated script for ${data.id} -> ${filePath}`);
        
    //     // IMPORTANT: You must return a response to avoid "non-nil" errors
    //     return e.json(200, { 
    //         status: "success", 
    //         message: "File created", 
    //         hexId: data.id 
    //     });

    // } catch (err) {
    //     return e.json(500, { 
    //         status: "error", 
    //         message: err.message 
    //     });
    // }
});

$app.rootCmd.addCommand(new Command({
    use: "hello",
    run: (cmd, args) => {
        console.log("Hello world!")
    },
}))


