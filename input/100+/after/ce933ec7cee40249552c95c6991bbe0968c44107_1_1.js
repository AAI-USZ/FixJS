function(done) {
      conn.execute('INSERT INTO test (id, stringcol) VALUES(?, ?)', 
          [1, 'String1']);
      conn.execute("INSERT INTO test (id, stringcol) VALUES(2, 'String2')");
      conn.execute('SELECT * FROM test').all(function(rows) {
        assert.equal(2, rows.length);
        assert.equal(rows[0].id, 1);
        assert.equal(rows[0].stringcol, 'String1');
        assert.equal(rows[1].id, 2);
        assert.equal(rows[1].stringcol, 'String2');
        done();
      });
    }