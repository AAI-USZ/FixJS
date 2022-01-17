function(id, installState) {
  var s = builder.plugins.db.createStatement("SELECT * FROM state WHERE identifier = :identifier");
  s.params.identifier = id;
  if (s.executeStep()) {
    s = builder.plugins.db.createStatement("UPDATE state SET installState = :installState WHERE identifier = :identifier");
    s.params.identifier = id;
    s.params.installState = installState; 
    s.executeStep();
  } else {
    s = builder.plugins.db.createStatement("INSERT INTO state VALUES (:identifier, :installState, :enabledState)");
    s.params.identifier = id;
    s.params.installState = installState;
    s.params.enabledState = builder.plugins.ENABLED; 
    s.executeStep();
  }
}