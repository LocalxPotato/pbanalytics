/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("json2545728356")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "json1992226401",
    "maxSize": 0,
    "name": "req",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "json2545728356",
    "maxSize": 0,
    "name": "req",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "json1992226401",
    "maxSize": 0,
    "name": "own",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
