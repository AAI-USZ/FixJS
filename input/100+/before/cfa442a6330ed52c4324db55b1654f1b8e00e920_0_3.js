function(id, enabledState) {
  var s = builder.plugins.db.createStatement("SELECT * FROM state WHERE identifier = :identifier");
  s.params.identifier = id;
  if (s.executeStep()) {
    s = builder.plugins.db.createStatement("UPDATE state SET enabledState = :enabledState WHERE identifier = :identifier");
    s.params.identifier = id;
    s.params.enabledState = enabledState; 
    s.executeStep();
  } else {
    s = builder.plugins.db.createStatement("INSERT INTO state VALUES (:identifier, :installState, :enabledState)");
    s.params.identifier = id;
    s.params.installState = builder.plugins.INSTALLED;
    s.params.enabledState = enabledState; 
    s.executeStep();
  }
}