function() {
    it('should not throw', function() {
      store = new CassandraStore({ pool: testpool });
    });
  }