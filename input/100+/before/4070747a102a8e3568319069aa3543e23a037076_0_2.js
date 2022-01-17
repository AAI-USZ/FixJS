function(){
      var db = start();
      var MyModel = db.model('MyModelasdf', new Schema({
          name: String
      }));
      db.close();

      assert.ok(MyModel.schema instanceof Schema);
      assert.ok(MyModel.prototype.schema instanceof Schema);

      var m = new MyModel({name:'aaron'});
      assert.equal('aaron', m.name);
    }