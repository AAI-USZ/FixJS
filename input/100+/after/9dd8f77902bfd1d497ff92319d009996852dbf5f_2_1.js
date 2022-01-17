function () {
    var db = start()
      , M = db.model(modelname, collection)

    db.close();

    var now = new Date
      , query;

    // Model.findOneAndRemove
    query = M.findOneAndRemove({ author: 'aaron' }, { select: 'author' });
    should.strictEqual(1, query._fields.author);
    should.strictEqual('aaron', query._conditions.author);

    query = M.findOneAndRemove({ author: 'aaron' });
    should.strictEqual(undefined, query._fields);
    should.strictEqual('aaron', query._conditions.author);

    query = M.findOneAndRemove();
    should.strictEqual(undefined, query.options.new);
    should.strictEqual(undefined, query._fields);
    should.strictEqual(undefined, query._conditions.author);

    // Query.findOneAndRemove
    query = M.where('author', 'aaron').findOneAndRemove({ date: now });
    should.strictEqual(undefined, query._fields);
    should.equal(now, query._conditions.date);
    should.strictEqual('aaron', query._conditions.author);

    query = M.find().findOneAndRemove({ author: 'aaron' }, { select: 'author' });
    should.strictEqual(1, query._fields.author);
    should.strictEqual('aaron', query._conditions.author);

    query = M.find().findOneAndRemove();
    should.strictEqual(undefined, query._fields);
    should.strictEqual(undefined, query._conditions.author);
  }