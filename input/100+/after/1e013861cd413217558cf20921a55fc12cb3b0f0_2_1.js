function() {
    it('should return the provided data', function(done) {
      var c = new Collection({path: '/foo', db: db.connect(TEST_DB), properties: {count: {type: 'number'}}});

      c.save({}, {count: 1}, {}, {}, function (err, item) {
        c.find({}, {}, {}, function (err, items) {
          expect(items.length).to.equal(1);
          done(err);
        });
      });
    });

    it('should return the provided data in sorted order', function(done) {
      var c = new Collection({path: '/sort', db: db.connect(TEST_DB), properties: {count: {type: 'number'}}});

      c.save({}, {count: 1}, {}, {}, function (err, item) {
        c.save({}, {count: 3}, {}, {}, function (err, item) {
          c.save({}, {count: 2}, {}, {}, function (err, item) {
            c.find({}, {$query: {}, $orderby: {count: 1}}, {}, function (err, items) {
              expect(items.length).to.equal(3);
              for(var i = 0; i < 3; i++) {
                delete items[i].id;
              }
              expect(items).to.eql([{count: 1}, {count: 2}, {count: 3}]);
              done(err);
            });
          });
        });
      });
    });
  }