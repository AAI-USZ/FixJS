function(done) {
      conn.execute('SELECT * FROM missing_table');
      conn.execute('SELECT 4');
      conn.execute('SELECT 3');
      conn.error(function(err) { 
        done();
      });
    }