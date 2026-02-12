/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1106534921")

  // remove field
  collection.fields.removeById("relation137994776")

  // remove field
  collection.fields.removeById("relation2522691515")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1106534921")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation137994776",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "link",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1125843985",
    "hidden": false,
    "id": "relation2522691515",
    "maxSelect": 2,
    "minSelect": 0,
    "name": "link1",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
