function(){
    it('of Numbers atomically', function(done){
      var db = start()
        , TempSchema = new Schema({
            nums: [Number]
          })
        , totalDocs = 2
        , saveQueue = [];

      mongoose.model('Temp', TempSchema);
      var Temp = db.model('Temp', collection);

      var t = new Temp();

      t.save(function(err){
        assert.ifError(err);

        Temp.findOne({ _id: t.get('_id') }, function(err, doc){
          assert.ifError(err);
          doc.get('nums').push(1);
          save(doc);
        });

        Temp.findOne({ _id: t.get('_id') }, function(err, doc){
          assert.ifError(err);
          doc.get('nums').push(2, 3);
          save(doc);
        });

        function save(doc) {
          saveQueue.push(doc);
          if (saveQueue.length == totalDocs) {
            saveQueue.forEach(function (doc) {
              doc.save(function (err) {
                assert.ifError(err);
                --totalDocs || complete();
              });
            });
          }
        };

        function complete () {
          Temp.findOne({ _id: t.get('_id') }, function (err, doc) {
            db.close();
            assert.ifError(err);
            assert.equal(3, doc.get('nums').length);

            var v = doc.get('nums').some(function(num){
              return num.valueOf() == '1';
            });
            assert.ok(v);

            v = doc.get('nums').some(function(num){
              return num.valueOf() == '2';
            });
            assert.ok(v);

            v = doc.get('nums').some(function(num){
              return num.valueOf() == '3';
            });
            assert.ok(v);
            done()
          });
        };
      });
    })

    it('of Strings atomically', function(done){
      var db = start()
        , StrListSchema = new Schema({
            strings: [String]
          })
        , totalDocs = 2
        , saveQueue = [];

      mongoose.model('StrList', StrListSchema);
      var StrList = db.model('StrList');

      var t = new StrList();

      t.save(function(err){
        assert.ifError(err);

        StrList.findOne({ _id: t.get('_id') }, function(err, doc){
          assert.ifError(err);
          doc.get('strings').push('a');
          save(doc);
        });

        StrList.findOne({ _id: t.get('_id') }, function(err, doc){
          assert.ifError(err);
          doc.get('strings').push('b', 'c');
          save(doc);
        });


        function save(doc) {
          saveQueue.push(doc);
          if (saveQueue.length == totalDocs) {
            saveQueue.forEach(function (doc) {
              doc.save(function (err) {
                assert.ifError(err);
                --totalDocs || complete();
              });
            });
          }
        };

        function complete () {
          StrList.findOne({ _id: t.get('_id') }, function (err, doc) {
            db.close();
            assert.ifError(err);

            assert.equal(3, doc.get('strings').length);

            var v = doc.get('strings').some(function(str){
              return str == 'a';
            });
            assert.ok(v);

            v = doc.get('strings').some(function(str){
              return str == 'b';
            });
            assert.ok(v);

            v = doc.get('strings').some(function(str){
              return str == 'c';
            });
            assert.ok(v);
            done();
          });
        };
      });
    })

    it('of Buffers atomically', function(done){
      var db = start()
        , BufListSchema = new Schema({
            buffers: [Buffer]
          })
        , totalDocs = 2
        , saveQueue = [];

      mongoose.model('BufList', BufListSchema);
      var BufList = db.model('BufList');

      var t = new BufList();

      t.save(function(err){
        assert.ifError(err);

        BufList.findOne({ _id: t.get('_id') }, function(err, doc){
          assert.ifError(err);
          doc.get('buffers').push(new Buffer([140]));
          save(doc);
        });

        BufList.findOne({ _id: t.get('_id') }, function(err, doc){
          assert.ifError(err);
          doc.get('buffers').push(new Buffer([141]), new Buffer([142]));
          save(doc);
        });

        function save(doc) {
          saveQueue.push(doc);
          if (saveQueue.length == totalDocs) {
            saveQueue.forEach(function (doc) {
              doc.save(function (err) {
                assert.ifError(err);
                --totalDocs || complete();
              });
            });
          }
        };

        function complete () {
          BufList.findOne({ _id: t.get('_id') }, function (err, doc) {
            db.close();
            assert.ifError(err);

            assert.equal(3, doc.get('buffers').length);

            var v = doc.get('buffers').some(function(buf){
              return buf[0] == 140;
            });
            assert.ok(v);

            v  = doc.get('buffers').some(function(buf){
              return buf[0] == 141;
            });
            assert.ok(v);

            v = doc.get('buffers').some(function(buf){
              return buf[0] == 142;
            });
            assert.ok(v);

            done();
          });
        };
      });
    })
  }