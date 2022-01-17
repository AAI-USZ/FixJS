function populate (schema, oid, query, fn) {
  if (!Array.isArray(oid)) {
    var conditions = query.conditions || {};
    conditions._id = oid;

    return this
    .model(query.model || schema.options.ref)
    .findOne(conditions, query.fields, query.options, fn);
  }

  if (!oid.length) {
    return fn(null, oid);
  }

  var model = this.model(query.model || schema.caster.options.ref)
    , conditions = query && query.conditions || {};
  conditions._id || (conditions._id = { $in: oid });

  model.find(conditions, query.fields, query.options, function (err, docs) {
    if (err) return fn(err);

    // user specified sort order?
    if (query.options && query.options.sort) {
      return fn(null, docs);
    }

    // put back in original id order (using a hash reduces complexity from n*n to 2n)
    var docHash = {};
    docs.forEach(function (doc) {
      docHash[doc._id] = doc;
    });

    var arr = [];
    oid.forEach(function (id) {
      if (id in docHash) arr.push(docHash[id]);
    });

    fn(null, arr);
  });
}