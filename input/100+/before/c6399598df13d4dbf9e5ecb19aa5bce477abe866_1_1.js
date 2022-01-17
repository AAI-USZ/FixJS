function() {
    var db = start();

    var MergedSchema = new Schema({
      a: {
        foo: String
      }
    });

    MergedSchema.add({
      a: {
        b: {
          bar: String
        }
      }
    });

    mongoose.model('Merged', MergedSchema);
    var Merged = db.model('Merged', 'merged_' + Math.random());

    var merged = new Merged({
      a: {
          foo: 'baz'
        , b: {
            bar: 'qux'
          }
      }
    });

    merged.save(function(err) {
      should.strictEqual(null, err);
      Merged.findById(merged.id, function(err, found) {
        db.close();
        should.strictEqual(null, err);
        found.a.foo.should.eql('baz');
        found.a.b.bar.should.eql('qux');
      });
    });
  }