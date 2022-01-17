function() {
      subject.fullUrl = 'google.com/foo';

      assert.equal(subject.domain, 'google.com');
      assert.equal(subject.url, '/foo');
    }