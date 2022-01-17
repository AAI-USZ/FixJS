function(conn) {
    conn.on('error', function(err) {
      console.error('Caught exception: ' + err);
      assert(/TLS session renegotiation attack/.test(err));
      conn.destroy();
    });
    conn.pipe(conn);
  }