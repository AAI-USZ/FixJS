function(){
    it('are created when model is compiled', function(done){
      var Indexed = new Schema({
          name  : { type: String, index: true }
        , last  : String
        , email : String
      });

      Indexed.index({ last: 1, email: 1 }, { unique: true });

      var db = start()
        , IndexedModel = db.model('IndexedModel', Indexed, 'indexedmodel' + random())
        , assertions = 0;

      IndexedModel.on('index', function(){
        IndexedModel.collection.getIndexes(function(err, indexes){
          assert.ifError(err);

          for (var i in indexes) {
            indexes[i].forEach(function(index){
              if (index[0] == 'name')
                assertions++;
              if (index[0] == 'last')
                assertions++;
              if (index[0] == 'email')
                assertions++;
            });
          }

          db.close();
          assert.equal(3, assertions);
          done();
        });
      });
    });

    it('of embedded documents', function(done){
      var BlogPosts = new Schema({
          _id     : { type: ObjectId, index: true }
        , title   : { type: String, index: true }
        , desc    : String
      });

      var User = new Schema({
          name        : { type: String, index: true }
        , blogposts   : [BlogPosts]
      });

      var db = start()
        , UserModel = db.model('DeepIndexedModel', User, 'deepindexedmodel' + random())
        , assertions = 0;

      UserModel.on('index', function () {
        UserModel.collection.getIndexes(function (err, indexes) {
          assert.ifError(err);

          for (var i in indexes) {
            indexes[i].forEach(function(index){
              if (index[0] == 'name')
                assertions++;
              if (index[0] == 'blogposts._id')
                assertions++;
              if (index[0] == 'blogposts.title')
                assertions++;
            });
          }

          db.close();
          assert.equal(3, assertions);
          done();
        });
      });
    });

    it('compound: on embedded docs', function(done){
      var BlogPosts = new Schema({
          title   : String
        , desc    : String
      });

      BlogPosts.index({ title: 1, desc: 1 });

      var User = new Schema({
          name        : { type: String, index: true }
        , blogposts   : [BlogPosts]
      });

      var db = start()
        , UserModel = db.model('DeepCompoundIndexModel', User, 'deepcompoundindexmodel' + random())
        , found = 0;

      UserModel.on('index', function () {
        UserModel.collection.getIndexes(function (err, indexes) {
          assert.ifError(err);

          for (var index in indexes) {
            switch (index) {
              case 'name_1':
              case 'blogposts.title_1_blogposts.desc_1':
                ++found;
                break;
            }
          }

          db.close();
          assert.equal(2, found);
          done();
        });
      });
    });

    it('error should emit on the db', function(done){
      var db = start();

      db.on('error', function (err) {
        if (/connection closed/.test(err.message)) return;
        db.close();
        assert.ok(/^E11000 duplicate key error index:/.test(err.message), err);
        done();
      });

      var schema = new Schema({ name: { type: String } })
        , Test = db.model('IndexError', schema, "x"+random());

      Test.create({ name: 'hi' }, { name: 'hi' }, function (err) {
        assert.strictEqual(err, null);
        Test.schema.index({ name: 1 }, { unique: true });
        Test.init();
      });
    });

  }