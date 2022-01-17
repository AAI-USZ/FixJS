function() {
      var calledWith;
      subject._createModel = function() {
        calledWith = arguments;
        return model;
      }

      subject.dispatch({
        params: { preset: 'local' }
      });

      assert.equal(subject.completeUrl, '/settings/');
      assert.equal(calledWith[0], 'local');
      assert.equal(subject.model, model);
      assert.ok(rendered);
    }