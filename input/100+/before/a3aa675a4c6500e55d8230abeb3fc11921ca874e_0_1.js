function(cid, options, callback) {
      var isSSL, name, self, setAttribute, sql,
        _this = this;
      self = this;
      sql = Squel.update().table('connections');
      sql.where('cid = $cid');
      setAttribute = function(name, value) {
        if (value && value !== void 0) {
          return sql.set(name, value);
        }
      };
      name = !_.isEmpty(options.name) ? options.name : options.hostname;
      setAttribute('name', name);
      setAttribute('server', options.hostname);
      setAttribute('port', options.port);
      setAttribute('nick', options.nickname);
      setAttribute('user_name', options.nickname);
      setAttribute('real_name', options.realname);
      setAttribute('ssl_fingerprint', options.ssl_fingerprint);
      isSSL = !!Number(options.ssl) ? 1 : 0;
      setAttribute('is_ssl', isSSL);
      setAttribute('server_pass', options.server_pass);
      return this.db.run(sql.toString(), {
        $cid: cid
      }, function(err) {
        if (err) {
          throw err;
        }
        return self.selectConnection(cid, function(row) {
          return callback(row);
        });
      });
    }