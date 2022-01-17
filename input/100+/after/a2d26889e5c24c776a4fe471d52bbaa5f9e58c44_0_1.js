function() {
      this.model.get("corpus").replicateCorpus();
//      (new Datum()).pouch(function(err, db) {
//        db.replicate.to(Utils.couchUrl, { continuous: false }, function(err, resp) {
//          Utils.debug("Replicate to");
//          Utils.debug(resp);
//          Utils.debug(err);
//        });
//        db.replicate.from(Utils.couchUrl, { continuous: false }, function(err, resp) {
//          Utils.debug("Replicate from");
//          Utils.debug(resp);
//          Utils.debug(err);
//        });
//      });
    }