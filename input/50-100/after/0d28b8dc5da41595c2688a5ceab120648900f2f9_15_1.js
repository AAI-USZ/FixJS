function() {
        var first = list['local-first'];
        assert.instanceOf(first, Calendar.Provider.Calendar.Local);
        assert.equal(first.provider, subject);
        assert.equal(first.id, 'local-first');
        assert.equal(first.name, 'Offline Calendar');
      }