function () {
    var db = start({ uri:  uri })
    var P = db.model('ShardPerson', collection);

    var zangief = new P({ name: 'Zangief', age: 33 });
    zangief.save(function (err) {
      should.strictEqual(null, err);

      zangief._shardval.name.should.equal('Zangief');
      zangief._shardval.age.should.equal(33);

      P.findById(zangief._id, function (err, zang) {
        should.strictEqual(null, err);

        zang._shardval.name.should.equal('Zangief');
        zang._shardval.age.should.equal(33);

        zang.likes = ['spinning', 'laughing'];
        zang.save(function (err) {
          should.strictEqual(null, err);

          zang._shardval.name.should.equal('Zangief');
          zang._shardval.age.should.equal(33);

          zang.likes.addToSet('winning');
          zang.save(function (err) {
            db.close();
            should.strictEqual(null, err);
            zang._shardval.name.should.equal('Zangief');
            zang._shardval.age.should.equal(33);
          });
        });
      });
    });
  }