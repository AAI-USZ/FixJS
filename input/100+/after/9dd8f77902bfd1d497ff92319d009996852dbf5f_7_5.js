function () {
    var q = new Query;
    q.setOptions({ thing: "cat" });
    q.setOptions({ populate: ['fans'] });
    q.setOptions({ batchSize: 10 });
    q.setOptions({ limit: 4 });
    q.setOptions({ skip: 3 });
    q.setOptions({ sort: ['blah', -1] });
    q.setOptions({ sort: {'woot': -1} });
    q.setOptions({ hint: { index1: 1, index2: -1 }});

    q.options.thing.should.equal('cat');
    q.options.populate.fans.should.eql({ fields: undefined, conditions: undefined, options: undefined, model: undefined });
    q.options.batchSize.should.eql(10);
    q.options.limit.should.eql(4);
    q.options.skip.should.eql(3);
    q.options.sort.length.should.eql(2);
    q.options.sort[0][0].should.equal('blah');
    q.options.sort[0][1].should.equal(-1);
    q.options.sort[1][0].should.equal('woot');
    q.options.sort[1][1].should.equal(-1);
    q.options.hint.index1.should.equal(1);
    q.options.hint.index2.should.equal(-1);

    var db = start();
    var Product = db.model('Product', 'Product_setOptions_test');
    Product.create(
        { numbers: [3,4,5] }
      , { strings: 'hi there'.split(' ') } , function (err, doc1, doc2) {

      should.strictEqual(null, err);

      Product.find().setOptions({ limit: 1, sort: {_id: -1} }).exec(function (err, docs) {
        db.close();
        should.strictEqual(null, err);
        docs.length.should.equal(1);
        docs[0].id.should.equal(doc2.id);
      });
    });
  }