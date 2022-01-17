function(){
      var db = start();
      var S = db.model('S', new Schema({ _id: String }));
      var N = db.model('N', new Schema({ _id: Number }));
      var O = db.model('O', new Schema({ _id: Schema.ObjectId }));

      it('with string _ids', function(){
        var s1 = new S({ _id: 'one' });
        var s2 = new S({ _id: 'one' });
        assert.ok(s1.equals(s2));
      })
      it('with number _ids', function(){
        var n1 = new N({ _id: 0 });
        var n2 = new N({ _id: 0 });
        assert.ok(n1.equals(n2));
      })
      it('with ObjectId _ids', function(){
        var id = new mongoose.Types.ObjectId;
        var o1 = new O({ _id: id });
        var o2 = new O({ _id: id });
        assert.ok(o1.equals(o2));

        id = String(new mongoose.Types.ObjectId);
        o1 = new O({ _id: id });
        o2 = new O({ _id: id });
        assert.ok(o1.equals(o2));
      })

      after(function () {
        db.close();
      })
    }