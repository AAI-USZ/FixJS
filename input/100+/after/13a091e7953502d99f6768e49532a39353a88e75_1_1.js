function(bssid, cb) {
      return this.db.all("SELECT * FROM survey WHERE bssid = '" + bssid + "'", cb);
    }