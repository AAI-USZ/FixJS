function(id) {
  try {
    var s = builder.plugins.db.createStatement("SELECT * FROM state WHERE identifier = :identifier");
    s.params.identifier = id;
    if (s.executeStep()) { // qqDPS Synchronous API usage, naughty.
      return {"installState": s.row.installState, "enabledState": s.row.enabledState};
    } else {
      // We have no record of it, so keep it as default.
      return {"installState": builder.plugins.INSTALLED, "enabledState": builder.plugins.ENABLED};
    }
  } finally { s.finalize(); }
}