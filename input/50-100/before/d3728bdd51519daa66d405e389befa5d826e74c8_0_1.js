function (test) {
  test.expect(2);
  
  var
    conn = cfg.mysql_libmysqlclient.createConnectionSync(cfg.host, cfg.user, cfg.password, cfg.database),
    res;
  test.ok(conn, "mysql_libmysqlclient.createConnectionSync(host, user, password, database)");
  
  test.equals(typeof conn.statSync(), "string", "typeof conn.statSync() is a string");
  conn.closeSync();
  
  test.done();
}