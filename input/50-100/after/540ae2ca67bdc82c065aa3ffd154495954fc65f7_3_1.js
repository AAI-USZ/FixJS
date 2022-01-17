function ReaverData(rvrPath, dbFile) {
      this.rvrPath = rvrPath != null ? rvrPath : '/usr/local/etc/reaver/';
      this.dbFile = dbFile != null ? dbFile : 'reaver.db';
      this.loadSession = __bind(this.loadSession, this);

      if (this.rvrPath.slice(-1) !== '/') {
        this.rvrPath += '/';
      }
      this.db = new sqlite3.Database("" + this.rvrPath + this.dbFile);
    }