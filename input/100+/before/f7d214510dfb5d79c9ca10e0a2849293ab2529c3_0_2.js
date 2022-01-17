function(done){
      var Human = new Schema({
          name  : String
        , email : { type: String, unique: true }
      });

      // turn it off
      Human.set('safe', false);

      mongoose.model('UnsafeHuman', Human, true);

      var db = start()
        , Human = db.model('UnsafeHuman', 'unsafehuman' + random());

      var me = new Human({
          name  : 'Guillermo Rauch'
        , email : 'rauchg@gmail.com'
      });

      me.save(function (err) {
        assert.ifError(err);

        Human.findById(me._id, function (err, doc){
          assert.ifError(err);
          assert.equal(doc.email,'rauchg@gmail.com');

          var copycat = new Human({
              name  : 'Lionel Messi'
            , email : 'rauchg@gmail.com'
          });

          copycat.save(function (err) {
            db.close();
            assert.ifError(err);
            done();
          });
        });
      });
    }