function (test) {
  test.expect(2);
  
  var
    conn = cfg.mysql_libmysqlclient.createConnectionSync(cfg.host, cfg.user, cfg.password, cfg.database),
    res;
  test.ok(conn, "mysql_libmysqlclient.createConnectionSync(host, user, password, database)");
  
  test.equals(conn.sqlStateSync(), "00000", "conn.sqlStateSync() after connection to allowed database");
  conn.closeSync();
  
  test.done();
}