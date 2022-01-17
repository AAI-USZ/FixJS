function(){
  var docs = null;
  before(function(done){
    var file = path.join(__dirname, 'fixtures/query.json');
    fs.readFile(file, function(err, json){
      docs = JSON.parse(json);
      for(var i in docs){
        var doc = docs[i];
        // doc._id   = new ObjectID(doc._id);
        doc.start = new Date(doc.start);
        doc.stop  = new Date(doc.stop);
      }
    });
    done();
  });

  beforeEach(function(done){
    database.connect(function(err, conn){
      if( err ){
        throw err;
      }else{
        conn.collection('programs', function(err, collection){
          if( err ){
            throw err;
          }else{
            collection.drop(function(err){
              collection.insert(docs, function(err){
                if( err ){
                  throw err;
                }else{
                  collection.count(function(err, c){
                    assert.equal(c, docs.length);
                    done();
                  });
                }
              });
            });
          }
        });
      }
    });
  });

  describe('getProgramListByDate', function(){
    it('should returns the list of programs', function(done){
      var t = new Date(2012, 0, 1); // 2012/01/01
      query.getProgramListByDate('c10', t, function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 2);
        done();
      });
    });

    it('should returns the list of programs on options specified', function(done){
      var t = new Date(2012, 0, 1); // 2012/01/01
      query.getProgramListByDate('c10', t, { start: 22, span: 1}, function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 1);
        done();
      });
    });

    it('should returns the empty list of programs', function(done){
      var t = new Date(2012, 0, 1); // 2012/01/01
      query.getProgramListByDate('c20', t, function(err, list){
        assert.isNotNull(list);
        assert.equal(list.length, 0);
        done();
      });
    });

  });
}