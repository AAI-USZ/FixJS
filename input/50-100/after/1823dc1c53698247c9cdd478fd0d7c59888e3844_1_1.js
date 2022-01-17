function() {
        var expected, userData;
        user.namespace = "user";
        userData = user.toJSON({
          namespace: 'photographer'
        });
        expected = {
          photographer: {
            firstName: 'Andreas',
            lastName: 'Gursky'
          }
        };
        return expect(userData).toEqual(expected);
      }