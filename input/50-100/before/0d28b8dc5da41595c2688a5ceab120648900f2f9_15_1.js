function() {
        var first = list['local-first'];
        assert.instanceOf(first, Calendar.Provider.Calendar.Local);
        assert.equal(first.provider, subject);
        //XXX This should be localized
        assert.equal(first.id, 'local-first');
        assert.equal(first.name, 'your_device');
      }