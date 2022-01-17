function (err, resp) {
    if (err) {
      res.json({
        status: 'failed to get'
      }, 400);
      return;
    }
    var domains = [];
    resp.forEach(function (row) {
      if (row.username == user._id) {
        domains.push({
          domain: row._id,
          appname: row.appname,
          host: row.host,
          port: row.port
        });
      }
    });
    res.json(domains);
  }