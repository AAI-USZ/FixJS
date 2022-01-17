function(){
    it('with same name on embedded docs do not class', function(){
      var Post = new Schema({
          title   : String
        , author  : { name : String }
        , subject : { name : String }
      });

      mongoose.model('PostWithClashGetters', Post);

      var db = start()
        , PostModel = db.model('PostWithClashGetters', 'postwithclash' + random());

      var post = new PostModel({
          title: 'Test'
        , author: { name: 'A' }
        , subject: { name: 'B' }
      });

      db.close();
      assert.equal(post.author.name,'A');
      assert.equal(post.subject.name,'B');
      assert.equal(post.author.name,'A');
    });

    it('should not be triggered at construction (gh-685)', function(){
      var db = start()
        , called = false

      db.close();

      var schema = new mongoose.Schema({
          number: {
              type:Number
            , set: function(x){return x/2}
            , get: function(x){
                called = true;
                return x*2;
              }
          }
      });

      var A = mongoose.model('gettersShouldNotBeTriggeredAtConstruction', schema);

      var a = new A({ number: 100 });
      assert.equal(false, called);
      var num = a.number;
      assert.equal(true, called);
      assert.equal(100, num.valueOf());
      assert.equal(50, a.getValue('number').valueOf());

      called = false;
      var b = new A;
      b.init({ number: 50 });
      assert.equal(false, called);
      num = b.number;
      assert.equal(true, called);
      assert.equal(100, num.valueOf());
      assert.equal(50, b.getValue('number').valueOf());
    })

    it('with type defined with { type: Native } (gh-190)', function(){
      var schema = new Schema({
          date: { type: Date }
      });

      mongoose.model('ShortcutGetterObject', schema);

      var db = start()
        , ShortcutGetter = db.model('ShortcutGetterObject', 'shortcut' + random())
        , post = new ShortcutGetter();

      db.close();
      post.set('date', Date.now());
      assert.ok(post.date instanceof Date);
    });

    describe('nested', function(){
      it('works', function(){
        var schema = new Schema({
          first: {
            second: [Number]
          }
        });
        mongoose.model('ShortcutGetterNested', schema);

        var db = start()
          , ShortcutGetterNested = db.model('ShortcutGetterNested', collection)
          , doc = new ShortcutGetterNested();

        db.close();
        assert.equal('object', typeof doc.first);
        assert.ok(doc.first.second instanceof MongooseArray);
      });

      it('works with object literals', function(){
        var db = start()
          , BlogPost = db.model('BlogPost', collection);

        db.close();
        var date = new Date;

        var meta = {
            date: date
          , visitors: 5
        };

        var post = new BlogPost()
        post.init({
            meta: meta
        });

        assert.ok(post.get('meta').date instanceof Date);
        assert.ok(post.meta.date instanceof Date);

        var threw = false;
        var getter1;
        var getter2;
        var strmet;
        try {
          strmet = JSON.stringify(meta);
          getter1 = JSON.stringify(post.get('meta'));
          getter2 = JSON.stringify(post.meta);
        } catch (err) {
          threw = true;
        }

        assert.equal(false, threw);
        getter1 = JSON.parse(getter1);
        getter2 = JSON.parse(getter2);
        assert.equal(getter1.visitors, getter2.visitors);
        assert.equal(getter1.date, getter2.date);

        post.meta.date = new Date - 1000;
        assert.ok(post.meta.date instanceof Date);
        assert.ok(post.get('meta').date instanceof Date);

        post.meta.visitors = 2;
        assert.equal('number', typeof post.get('meta').visitors);
        assert.equal('number', typeof post.meta.visitors);

        var newmeta = {
            date: date - 2000
          , visitors: 234
        };

        post.set(newmeta, 'meta');

        assert.ok(post.meta.date instanceof Date);
        assert.ok(post.get('meta').date instanceof Date);
        assert.equal('number', typeof post.meta.visitors);
        assert.equal('number', typeof post.get('meta').visitors);
        assert.equal((+post.meta.date),date - 2000);
        assert.equal((+post.get('meta').date),date - 2000);
        assert.equal((+post.meta.visitors),234);
        assert.equal((+post.get('meta').visitors),234);

        // set object directly
        post.meta = {
            date: date - 3000
          , visitors: 4815162342
        };

        assert.ok(post.meta.date instanceof Date);
        assert.ok(post.get('meta').date instanceof Date);
        assert.equal('number', typeof post.meta.visitors);
        assert.equal('number', typeof post.get('meta').visitors);
        assert.equal((+post.meta.date),date - 3000);
        assert.equal((+post.get('meta').date),date - 3000);
        assert.equal((+post.meta.visitors),4815162342);
        assert.equal((+post.get('meta').visitors),4815162342);
      })

      it('object property access works when root initd with null', function(done){
        var db = start()

        var schema = new Schema({
          nest: {
            st: String
          }
        });

        mongoose.model('NestedStringA', schema);
        var T = db.model('NestedStringA', collection);

        var t = new T({ nest: null });

        assert.strictEqual(t.nest.st, undefined);
        t.nest = { st: "jsconf rules" };
        assert.deepEqual(t.nest.toObject(),{ st: "jsconf rules" });
        assert.equal(t.nest.st,"jsconf rules");

        t.save(function (err) {
          db.close();
          assert.ifError(err);
          done();
        });
      });

      it('object property access works when root initd with undefined', function(done){
        var db = start()

        var schema = new Schema({
          nest: {
            st: String
          }
        });

        mongoose.model('NestedStringB', schema);
        var T = db.model('NestedStringB', collection);

        var t = new T({ nest: undefined });

        assert.strictEqual(t.nest.st, undefined);
        t.nest = { st: "jsconf rules" };
        assert.deepEqual(t.nest.toObject(),{ st: "jsconf rules" });
        assert.equal(t.nest.st,"jsconf rules");

        t.save(function (err) {
          db.close();
          assert.ifError(err);
          done();
        })
      });

      it('pre-existing null object re-save', function(done){
        var db = start()

        var schema = new Schema({
          nest: {
              st: String
            , yep: String
          }
        });

        mongoose.model('NestedStringC', schema);
        var T = db.model('NestedStringC', collection);

        var t = new T({ nest: null });

        t.save(function (err) {
          assert.ifError(err);

          t.nest = { st: "jsconf rules", yep: "it does" };
          t.save(function (err) {
            assert.ifError(err);

            T.findById(t.id, function (err, t) {
              assert.ifError(err);
              assert.equal(t.nest.st,"jsconf rules");
              assert.equal(t.nest.yep,"it does");

              t.nest = null;
              t.save(function (err) {
                db.close();
                assert.ifError(err);
                assert.strictEqual(t._doc.nest, null);
                done();
              });
            });
          });
        });
      });

      it('array of Mixed on existing doc can be pushed to', function(done){
        var db = start();

        mongoose.model('MySchema', new Schema({
          nested: {
            arrays: []
          }
        }));

        var DooDad = db.model('MySchema')
          , doodad = new DooDad({ nested: { arrays: [] } })
          , date = 1234567890;

        doodad.nested.arrays.push(["+10", "yup", date]);

        doodad.save(function (err) {
          assert.ifError(err);

          DooDad.findById(doodad._id, function (err, doodad) {
            assert.ifError(err);

            assert.deepEqual(doodad.nested.arrays.toObject(), [['+10','yup',date]]);

            doodad.nested.arrays.push(["another", 1]);

            doodad.save(function (err) {
              assert.ifError(err);

              DooDad.findById(doodad._id, function (err, doodad) {
                db.close();
                assert.ifError(err);
                assert.deepEqual(doodad.nested.arrays.toObject(), [['+10','yup',date], ["another", 1]]);
                done();
              });
            });
          });
        });
      })

      it('props can be set directly when property was named "type"', function(done){
        var db = start();

        function def () {
          return [{ x: 1 }, { x: 2 }, { x:3 }]
        }

        mongoose.model('MySchema2', new Schema({
          nested: {
              type: { type: String, default: 'yep' }
            , array: {
                type: Array, default: def
              }
          }
        }));

        var DooDad = db.model('MySchema2', collection)
          , doodad = new DooDad()

        doodad.save(function (err) {
          assert.ifError(err);

          DooDad.findById(doodad._id, function (err, doodad) {
            assert.ifError(err);

            assert.equal(doodad.nested.type,"yep");
            assert.deepEqual(doodad.nested.array.toObject(), [{x:1},{x:2},{x:3}]);

            doodad.nested.type = "nope";
            doodad.nested.array = ["some", "new", "stuff"];

            doodad.save(function (err) {
              assert.ifError(err);

              DooDad.findById(doodad._id, function (err, doodad) {
                db.close();
                assert.ifError(err);
                assert.equal(doodad.nested.type,"nope");
                assert.deepEqual(doodad.nested.array.toObject(), ["some", "new", "stuff"]);
                done();
              });
            });
          })
        });
      });

    });
  }