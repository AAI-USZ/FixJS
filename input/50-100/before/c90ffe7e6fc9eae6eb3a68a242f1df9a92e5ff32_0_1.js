function () {
        expect(mailcheck.splitEmail('example.com')).toBeFalsy();
        expect(mailcheck.splitEmail('abc.example.com')).toBeFalsy();
      }