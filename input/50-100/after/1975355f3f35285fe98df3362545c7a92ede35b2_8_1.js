function(err){
      assert.ok(a.__parent._validationError instanceof ValidationError);
      assert.equal(a.__parent.errors['jsconf.ar.0.work'].name, 'ValidatorError');
      assert.equal(a.__parent._validationError.toString(), 'ValidationError: Validator "required" failed for path test, Validator failed for path work');
      done();
    }