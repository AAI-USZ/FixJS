function(){}, function(err, people){
        test.ifError(err, 'expect no error');
        test.equal(people.length, 3, 'three people in people set');

        var query = that.popit.model('Organisation').find();
        query.exec(function(err, docs) {
          test.equal(docs.length, 1, 'one organisation in database');
          test.done();
        });
      }