function (e) {
    var sDb = e.target.result;

    if (sDb.setVersion && Number(sDb.version) !== gazel.version) {
      var dbReq = sDb.setVersion(String(gazel.version));
      dbReq.onsuccess = function (e2) {
        var e3 = {}; e3.target = {};
        e3.target.result = e2.target.result.db;
        
        req.onupgradeneeded(e3);
        reqSuccess(e3);
        
        return;
      };

      dbReq.onerror = onerror;
      dbReq.onfailure = onerror;
      dbReq.onblocked = onerror;

      return;
    }

    db = sDb;
    loadingDb = false;

    onsuccess(db);
  }