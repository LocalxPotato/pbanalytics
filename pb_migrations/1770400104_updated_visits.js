/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1935361188")

  // add field
  collection.fields.addAt(1, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url4101391790",
    "name": "url",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text646683805",
    "max": 0,
    "min": 0,
    "name": "agent",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date1872009285",
    "max": "",
    "min": "",
    "name": "time",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2783163181",
    "max": 0,
    "min": 0,
    "name": "ip",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1935361188")

  // remove field
  collection.fields.removeById("url4101391790")

  // remove field
  collection.fields.removeById("text646683805")

  // remove field
  collection.fields.removeById("date1872009285")

  // remove field
  collection.fields.removeById("text2783163181")

  return app.save(collection)
})
