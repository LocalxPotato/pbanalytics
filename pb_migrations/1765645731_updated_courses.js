/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" && @request.body.name:changed = false"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.id != \"\" "
  }, collection)

  return app.save(collection)
})
