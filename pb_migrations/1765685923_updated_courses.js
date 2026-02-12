/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.isAdmin = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update collection data
  unmarshal({
    "createRule": null
  }, collection)

  return app.save(collection)
})
