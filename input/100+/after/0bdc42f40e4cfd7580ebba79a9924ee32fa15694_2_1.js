function (e) {
  resources[e] = {};

  vows.describe('resourceful/' + e.name + '/relationship')
  .addBatch(macros.defineResources(e, resources))
  .export(module);
}