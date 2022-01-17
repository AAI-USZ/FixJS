function(){}, function(err, people){
        test.ifError(err, 'expect no error');
        test.equal(people.length, 3, 'three people in people set');

        var query = that.popit.model('Person').find().asc('name');
        query.run(function(err, docs) {
          test.equal(docs.length, 3, 'three people in database');
        });

        test.done();
      }