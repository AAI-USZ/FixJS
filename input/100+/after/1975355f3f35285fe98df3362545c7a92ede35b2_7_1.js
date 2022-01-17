function(){
    it('array of object literal missing a type is interpreted as DocumentArray', function(){
      var goose = new mongoose.Mongoose;
      var s = new Schema({
          arr: [
            { something: { type: String } }
          ]
      });
      assert.ok(s.path('arr') instanceof SchemaTypes.DocumentArray);
      var M = goose.model('objectliteralschema', s);
      var m = new M({ arr: [ { something: 'wicked this way comes' }] });
      assert.equal('wicked this way comes', m.arr[0].something);
      assert.ok(m.arr[0]._id);
    });

    it('of nested schemas should throw (gh-700)', function(){
      var a = new Schema({ title: String })
        , err

      try {
        new Schema({ blah: Boolean, a: a });
      } catch (err_) {
        err = err_;
      }

      assert.ok(err);
      assert.ok(/Did you try nesting Schemas/.test(err.message));
    });

  }