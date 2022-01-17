function(test) {
      var value = {
        _id: 'docid',
        exists: true
      };

      var doc = new Document();
      test.ok(doc.update(deepClone(value)));

      test.strictEqual(doc.id, 'docid');
      test.strictEqual(doc.rev.updateCount, 1);
      test.ok(doc.rev.hash);

      var compareValue = deepClone(doc.body);
      delete compareValue._rev;
      delete compareValue._meta;
      test.deepEqual(compareValue, value);
      test.done();
    }