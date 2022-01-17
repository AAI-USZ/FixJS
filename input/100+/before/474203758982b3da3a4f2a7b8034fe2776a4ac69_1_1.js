function () {
  // Lazy-assign default query type of 'find'
  if (!this.type) this.type = 'find';

  // syncRun is also called by the Query Model Scope on dependency changes
  var model = this._model
    , domain = model.get(this.ns)
    , filterFn = this.filterFn;
  if (filterFn) domain = filterDomain(domain, filterFn);

  // TODO Register the transform, so it can be cleaned up when we no longer
  // need it

  var queryJson = this.toJSON()
    , memoryQuery = this.memoryQuery = new MemoryQuery(queryJson)
    , result = memoryQuery.syncRun(domain)
    , comparator = this._comparator;
  if (comparator) result = result.sort(comparator);

  // TODO queryId here will not be unique once we introduct ad hoc filter
  // functions
  var queryId = QueryBuilder.hash(queryJson);
  return setupQueryModelScope(model, memoryQuery, queryId, result);
}