function () {
    var db = start()
      , M = db.model(modelname, collection)
      , _id = new DocumentObjectId

    db.close();

    var now = new Date
      , query;

    // Model.findByIdAndRemove
    query = M.findByIdAndRemove(_id, { fields: 'author' });
    should.strictEqual(1, query._fields.author);
    should.strictEqual(_id.toString(), query._conditions._id.toString());

    query = M.findByIdAndRemove(_id.toString());
    should.strictEqual(undefined, query._fields);
    should.strictEqual(_id.toString(), query._conditions._id);

    query = M.findByIdAndRemove();
    should.strictEqual(undefined, query.options.new);
    should.strictEqual(undefined, query._fields);
    should.strictEqual(undefined, query._conditions._id);
  }