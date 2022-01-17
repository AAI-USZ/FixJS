function(frame) {
  for (var n = 0; n < this.dirtyEntitiesLength_; n++) {
    var entity = this.dirtyEntities_[n];
    goog.asserts.assert(entity);

    // Run per-frame change entity logic
    entity.postTickUpdate(frame);

    // Run custom simulator code on the entity
    // This may send commands, network sync packets, etc
    this.postTickUpdateEntity(frame, entity);
  }
}