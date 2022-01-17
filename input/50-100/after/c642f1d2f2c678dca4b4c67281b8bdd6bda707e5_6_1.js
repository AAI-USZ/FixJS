function() {
      provider.useCredentials = true;
      subject.user = 'foo';
      subject.password = 'bar';
      subject.url = 'missing';

      update();

      assert.ok(!provider.url);
      assert.equal(provider.user, subject.user);
      assert.equal(provider.passsword, subject.passsword);
    }