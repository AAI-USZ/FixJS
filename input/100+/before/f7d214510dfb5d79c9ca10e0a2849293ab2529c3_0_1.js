function(done){
      var Human = new Schema({
          name  : String
        , email : { type: String, unique: true }
      });

      mongoose.model('SafeHuman', Human, true);

      var db = start()
        , Human = db.model('SafeHuman', 'safehuman' + random());

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
            assert.ok(/duplicate/.test(err.message));
            assert.ok(err instanceof Error);
            done();
          });
        });
      });
    }