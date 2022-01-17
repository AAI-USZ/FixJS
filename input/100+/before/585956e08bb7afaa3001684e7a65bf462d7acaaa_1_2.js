function() {
      var response = '<html></html>', cb;

      setup(function(done) {
        var xhr;
        request({
          data: data,
          url: url,
          method: 'PUT'
        });
        cb = callback.bind(this, done);
        subject.send(cb);

        //should be waiting inbetween requests
        assert.equal(subject.waiting, true);

        xhr = subject.xhr;
        xhr.readyState = 4;
        xhr.responseText = response;
        xhr.onreadystatechange();
      });

      test('should not be waiting after response', function() {
        assert.equal(subject.waiting, false);
      });

      test('should send callback parsed data and xhr', function() {
        assert.equal(responseXhr, subject.xhr);
      });

      opensXHR();
    }