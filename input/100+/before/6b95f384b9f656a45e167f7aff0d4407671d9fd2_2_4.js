function(){
    it('allows passing a schema', function(){
      var db = start();
      var MyModel = db.model('MyModelasdf', new Schema({
          name: String
      }));
      db.close();

      assert.ok(MyModel.schema instanceof Schema);
      assert.ok(MyModel.prototype.schema instanceof Schema);

      var m = new MyModel({name:'aaron'});
      assert.equal('aaron', m.name);
    })
    it('should properly assign the db', function(){
      var A = mongoose.model('testing853a', new Schema({x:String}), 'testing853-1');
      var B = mongoose.model('testing853b', new Schema({x:String}), 'testing853-2');
      var C = B.model('testing853a');
      assert.ok(C == A);
    })
  }