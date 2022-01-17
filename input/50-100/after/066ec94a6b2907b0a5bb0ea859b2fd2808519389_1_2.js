function () {
      var s = new Schema({
          name: String
      });
      var opts = { fields: 'name', upper: true, keyType: 'plain' };
      s.plugin(fts, opts);
      var A = mongoose.model('A', s);
      var a = new A;
      a.name = 'Stravinsky'
      assert.equal(a.updateIndex()[0], 'Stravinsky');
    }