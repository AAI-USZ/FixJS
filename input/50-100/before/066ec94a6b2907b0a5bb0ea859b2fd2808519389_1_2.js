function () {
      var s = new Schema({
          name: String
      });
      var opts = { fields: 'name', upper: true };
      s.plugin(keywords, opts);
      var A = mongoose.model('A', s);
      var a = new A;
      a.name = 'Stravinsky'
      assert.equal(a.keywordize()[0],'Stravinsky');
    }