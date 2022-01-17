function (done) {
    var db = start();

    var schema = new Schema({
        docs: [new Schema({name: { type: String, select: false}})]
    });

    var M = db.model('SelectingOnly_idWithExcludedSchemaType', schema);
    M.find().select('_id -docs.name').exec(function (err) {
      assert.ok(err instanceof Error, 'conflicting path selection error should be instance of Error');

      M.find().select('_id').exec(function (err) {
        db.close();
        assert.ifError(err, err && err.stack);
        done();
      });
    });
  }