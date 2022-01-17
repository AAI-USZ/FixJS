function(){
      var a = new Schema({ title: String })
        , err

      try {
        new Schema({ blah: Boolean, a: a });
      } catch (err_) {
        err = err_;
      }

      assert.ok(err);
      assert.ok(/Did you try nesting Schemas/.test(err.message));
    }