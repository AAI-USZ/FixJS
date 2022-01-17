function() {
      subject.fullUrl = 'http://google.com/foo/bar';

      assert.equal(subject.domain, 'http://google.com');
      assert.equal(subject.url, '/foo/bar');
    }