function(cb) {
      var sql;
      sql = "create table if not exists schema_migrations(\n  version varchar(256) not null primary key,\n  up text,\n  down text,\n  created_at timestamp default current_timestamp\n);";
      return this.exec(sql, cb);
    }