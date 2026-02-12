/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1106534921")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2134807182",
    "maxSelect": 2,
    "name": "choice",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "a",
      "b",
      "c"
    ]
  }))

  // update field
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

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1125843985",
    "hidden": false,
    "id": "relation2522691515",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "link1",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1106534921")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2134807182",
    "maxSelect": 2,
    "name": "field2",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "a",
      "b",
      "c"
    ]
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation137994776",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "field3",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1125843985",
    "hidden": false,
    "id": "relation2522691515",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "field4",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
