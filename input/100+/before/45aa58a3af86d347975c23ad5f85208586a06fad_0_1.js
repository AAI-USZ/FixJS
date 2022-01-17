function erase (req, res, next) {
  var appname = req.param("appname").toLowerCase()
    , domain = req.param("domain").toLowerCase()
    , user   = req.user
    , app    = req.app
    ;

  var gooddomain = lib.checkDomain(domain);
  if (gooddomain === true) {
    var aliasdomains = lib.get_couchdb_database('aliasdomains');
    aliasdomains.get(domain, function (err, doc) {
      if (err) {
        if (err.error == 'not_found') {
          res.json({
            status: "failure - domain not found."
          }, 400);
        } else {
          res.json({
            status: "failure",
            message: err.error + ' - ' + err.reason
          }, 400);
        }
      } else {
        if (doc.appname == appname) {
          aliasdomains.remove(domain, function (err, resp) {
            if (err) {
              res.json({
                status: "failure",
                message: err.error + ' - ' + err.reason
              }, 400);
            } else {
              res.json({
                status: "success",
                message: "Domain deleted."
              }, 400);
            }
          });
        } else {
          res.json({
            status: "failure - domain is not for this app."
          }, 400);
        }
      }
    });
  } else {
    res.json({
      status: "failure - " + gooddomain
    }, 400);
  }
}