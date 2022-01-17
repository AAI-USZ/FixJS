function setupQueryModelScope (model, memoryQuery, queryId, initialResult) {
  var queryType = memoryQuery.type
    , refPath = resultRefPath(queryId, queryType)
    , pointerPath = resultPointerPath(queryId, queryType)
    , ns = memoryQuery.ns
    , scopedModel, listener;

  if (model[refPath]) return model.at(refPath);

  // Refs, assemble!
  if (queryType === 'findOne') {
    // TODO Test findOne single query result
    if (initialResult) {
      model.set(pointerPath, initialResult.id);
    }

    scopedModel = model.ref(refPath, ns, pointerPath);

  } else {
    if (initialResult) {
      model.set(pointerPath, initialResult.map( function (doc) {
        return doc.id;
      }));
    }

    scopedModel = model.refList(refPath, ns, pointerPath);
  }

  listener = createMutatorListener(model, pointerPath, ns, scopedModel, memoryQuery);
  model.on('mutator', listener);

  // TODO: This is a total hack. Fix the initialization of filters in client
  // and prevent filters from generating multiple listeners
  model[refPath] = listener;

  return scopedModel;
}