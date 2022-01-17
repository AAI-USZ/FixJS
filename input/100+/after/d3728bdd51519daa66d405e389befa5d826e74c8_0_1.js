function (test) {
  test.expect(1);

  var
    conn = cfg.mysql_libmysqlclient.createConnectionSync(),
    key = path.resolve(__dirname, '../ssl-fixtures/client-key.pem'),
    cert = path.resolve(__dirname, '../ssl-fixtures/client-cert.pem'),
    ca = path.resolve(__dirname, '../ssl-fixtures/ca-cert.pem');

  conn.initSync();

  conn.setSslSync(key, cert, ca, "", "ALL");

  conn.realConnectSync(cfg.host, cfg.user, cfg.password, cfg.database);

  test.ok(conn.connectedSync());

  conn.closeSync();

  test.done();
}