function fail(reason) {
    var r = { success: false };
    if (reason) r.reason = reason;
    logger.debug('authentication fails for user: ' + req.params.email + (reason ? (' - ' + reason) : ""));
    return res.json(r);
  }