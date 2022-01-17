function() {
      subject.domain = 'http://google.com';
      subject.url = '/foo';

      assert.equal(subject.fullUrl, 'http://google.com/foo');
    }