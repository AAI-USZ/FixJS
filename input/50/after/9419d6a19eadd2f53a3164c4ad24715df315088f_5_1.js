function(entities) {
  // Subclasses that can do this more efficiently really should...
  for (var n = 0; n < entities.length; n++) {
    this.updateEntity(entities[n]);
  }
}