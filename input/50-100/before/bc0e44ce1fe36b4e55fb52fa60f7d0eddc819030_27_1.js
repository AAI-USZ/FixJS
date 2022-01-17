function() {
      var calledWith;

      subject._wrapObject = function() {
        calledWith = arguments;
        return uniq;
      }

      var view = new View();

      subject.state('/foo', view);
      hasClear();

      assert.equal(page.routes[0][0], '/foo');
      assert.equal(page.routes[0][2], uniq);

      assert.deepEqual(calledWith, [view]);
    }