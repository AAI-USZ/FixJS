function setupQueryModelScope (model, memoryQuery, queryId, initialResult) {
  var queryType = memoryQuery.type
    , refPath = resultRefPath(queryId, queryType)
    , pointerPath = resultPointerPath(queryId, queryType)
    , ns = memoryQuery.ns
    , scopedModel;

  // Refs, assemble!
  switch (queryType) {
    case 'findOne':
      // TODO Test findOne single query result
      if (initialResult) {
        model.set(pointerPath, initialResult.id);
      }

      scopedModel = model.ref(refPath, ns, pointerPath);

      var listener = createMutatorListener(model, pointerPath, ns, scopedModel, memoryQuery);
      model.on('mutator', listener);
      break;

    case 'find':
    default:
      if (initialResult) {
        model.set(pointerPath, initialResult.map( function (doc) {
          return doc.id;
        }));
      }

      scopedModel = model.refList(refPath, ns, pointerPath);

      var listener = createMutatorListener(model, pointerPath, ns, scopedModel, memoryQuery);
      model.on('mutator', listener);
  }
  return scopedModel;
}