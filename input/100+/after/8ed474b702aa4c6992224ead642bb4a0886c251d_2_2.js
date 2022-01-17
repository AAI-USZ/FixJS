function(done) {
    async.auto({
      dudes: function(cb) {
        db.save([{name: 'Jon'}, {name: 'Helge'}], cb);
      },
      
      fuels: function(cb) {
        db.save([{name: 'beer'}, {name: 'coffee'}], cb);
      },
      
      link: ['dudes', 'fuels', function(cb, res) {
        db.rel.create(res.dudes, 'craves', res.fuels, cb);
      }],

      readLink: ['link', function(cb, res) {
        db.rel.read(res.link, cb);
      }],

      check: ['readLink', function(cb, res) {
        assert.equal(res.readLink.length, 4);
        cb();
      }]
    }, done);
  }