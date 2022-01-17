function() {
        var expected, userData;
        user.namespace = 'user';
        userData = user.toJSON({
          namespace: false
        });
        expected = {
          firstName: 'Andreas',
          lastName: 'Gursky'
        };
        return expect(userData).toEqual(expected);
      }