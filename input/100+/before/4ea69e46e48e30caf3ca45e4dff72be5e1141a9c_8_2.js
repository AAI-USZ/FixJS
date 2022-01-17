function(time) {
  var timeDelta = time - this.lastFlushTime_;
  this.lastFlushTime_ = time;
  // TODO(benvanik): ignore if not enough time has elapsed

  // Prepare packet
  var writer = this.writer_;
  writer.begin(this.confirmedSequence_);

  // Commands
  var pendingCommands = this.outgoingCommandList_.getArray();
  var pendingCommandCount = this.outgoingCommandList_.getCount();
  if (pendingCommandCount) {
    for (var n = 0; n < pendingCommandCount; n++) {
      var command = commands[n];

      // Check if the command targets an irrelevant entity
      if (command.targetEntityId != gf.sim.NO_ENTITY_ID) {
        if (!this.trackedEntities_[command.targetEntityId]) {
          // Not tracked - ignore
          continue;
        }
      }

      // Add command
      writer.addCommand(command);
    }
    this.outgoingCommandList_.resetList();
  }

  // For each relevant entity that changed this tick...
  for (var n = 0; n < this.updatedEntitiesList_.length; n++) {
    var entity = this.updatedEntitiesList_[n];

    // Remove from update set
    var id = entity.getId();
    var dirtyFlags = this.updatedEntitiesSet_[id];
    // TODO(benvanik): more efficient way? just set bits to zero and compact?
    delete this.updatedEntitiesSet_[id];

    // If the entity was created and deleted this tick, ignore entirely and
    // avoid sending to the client
    if (!dirtyFlags ||
        (dirtyFlags & gf.sim.EntityDirtyFlag.CREATED_AND_DELETED)) {
      continue;
    }

    // Add create/update/delete based on flags
    if (dirtyFlags & gf.sim.EntityDirtyFlag.DELETED) {
      writer.addDeleteEntity(entity);
    } else if (dirtyFlags & gf.sim.EntityDirtyFlag.CREATED) {
      writer.addCreateEntity(entity);
    } else if (dirtyFlags & gf.sim.EntityDirtyFlag.UPDATED) {
      writer.addUpdateEntity(entity);
    }
  }

  // IFF we have a valid packet, emit
  // TODO(benvanik): check to ensure something got changed
  this.session_.send(writer.finish(), this.user_);

  // Reset state for the next tick
  // TODO(benvanik): prevent this resize and reuse the list (being careful of
  //     leaks by nulling out above)
  this.updatedEntitiesList_.length = 0;
}