routerAdd("POST", "/api/register", (e) => {
  const data = e.requestInfo().body;


  const ensureCollection = (cname) => {
    try {
      // Check if it already exists to avoid errors
      $app.findCollectionByNameOrId(cname);
    } catch (err) {
      const collection = new Collection({
        name: cname,
        type: "base",
        listRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        fields: [
          { name: "ip", type: "text", required: true },
          { name: "as_domain", type: "text" },
          { name: "country_code", type: "text" },
          { name: "country", type: "text" },
          { name: "agent", type: "text" },
          { name: "url", type: "url" },
          { name: "time", type: "date", required: true },
        ],
      });
      $app.save(collection);
    }
  };
  ensureCollection(data.id);
  console.log(`Collection ${JSON.stringify(data.id)} is ready.`);

  try {
    const filename = `${data.id}.js`;
    const content = data.id;
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
});/// <reference path="..\pb_data\types.d.ts" />

