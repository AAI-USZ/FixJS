function() {
      var user = 'user';
      var password = 'pass';
      var url = '/foo';

      request({
        globalXhrOptions: { mozSystem: true },
        user: user,
        password: password,
        method: 'GET',
        url: url
      });


      subject.send(function() {});
      var args = subject.xhr.openArgs;

      assert.deepEqual(
        args,
        ['GET', url, true]
      );

      assert.equal(
        subject.xhr.headers['Authorization'],
        subject._credentials(user, password)
      );
    }