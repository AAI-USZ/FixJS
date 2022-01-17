function() {
    suite('when there is an xhr object', function() {
      var aborted;

      setup(function() {
        aborted = false;
        subject.xhr = {
          abort: function() {
            aborted = true;
          }
        };
        subject.abort();
      });

      test('should call abort on the xhr object', function() {
        assert.equal(aborted, true);
      });
    });

    suite('when there is no xhr object', function() {
      test('should not fail', function() {
        subject.xhr = null;
        subject.abort();
      });
    });
  }