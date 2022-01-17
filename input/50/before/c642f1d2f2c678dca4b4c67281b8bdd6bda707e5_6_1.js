function() {
      subject.domain = 'google.com';
      subject.url = '/foo';

      assert.equal(subject.fullUrl, 'google.com/foo');
    }