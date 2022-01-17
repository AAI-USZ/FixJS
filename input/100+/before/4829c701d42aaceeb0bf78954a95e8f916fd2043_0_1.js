function(packet, packetType, reader) {
  // Read header
  var confirmedSequence = reader.readVarInt();
  var createEntityCount = reader.readVarInt();
  var updateEntityCount = reader.readVarInt();
  var deleteEntityCount = reader.readVarInt();
  var commandCount = reader.readVarInt();

  // Confirm prediction sequence number
  // This performs the slicing of the stashed command list to be only those
  // sent or unsent and not yet confirmed
  this.simulator_.outgoingCommandList_.confirmSequence(confirmedSequence);

  // TODO(benvanik): cached parenting list
  var parentingRequired = null;;

  // Create entities
  for (var n = 0; n < createEntityCount; n++) {
    // Read entity ID, uncompress into full ID
    var entityId = reader.readVarInt() << 1;

    // Read entity info
    var entityTypeId = reader.readVarInt();
    var entityFlags = reader.readVarInt();
    var entityParentId = reader.readVarInt();

    // Get entity type factory
    var entityFactory = this.simulator_.getEntityFactory(entityTypeId);
    if (!entityFactory) {
      // Invalid entity type
      gf.log.debug('Invalid entity type ' + entityTypeId + ' from server');
      return false;
    }

    // Create entity
    var entity = entityFactory.createEntity(
        this.simulator_, entityId, entityFlags);

    // Load initial values
    entity.read(reader);

    // Add to simulation
    this.simulator_.addEntity(entity);

    // Queue for parenting
    // We have to do this after the adds as we are not sorted and the parent
    // may be the next entity in the packet
    if (entityParentId) {
      if (!parentingRequired) {
        parentingRequired = [];
      }
      parentingRequired.push([entity, entityParentId]);
    }

    gf.log.write('<- create entity', entityId);
  }

  // Update entities
  for (var n = 0; n < updateEntityCount; n++) {
    // Read entity ID, uncompress into full ID
    var entityId = reader.readVarInt() << 1;

    // Find entity
    var entity = /** @type {gf.sim.ClientEntity} */ (
        this.simulator_.getEntity(entityId));
    if (!entity) {
      // Entity not found
      gf.log.debug('Target entity of server update not found ' + entityId);
      return false;
    }

    // Load delta values
    entity.readDelta(reader);

    gf.log.write('<- update entity', entityId);
  }

  // Delete entities
  for (var n = 0; n < deleteEntityCount; n++) {
    // Read entity ID, uncompress into full ID
    var entityId = reader.readVarInt() << 1;

    // Find entity
    var entity = this.simulator_.getEntity(entityId);
    if (!entity) {
      // Entity not found
      gf.log.debug('Target entity of server delete not found ' + entityId);
      return false;
    }

    // Remove from simulation
    this.simulator_.removeEntity(entity);

    gf.log.write('<- delete entity', entityId);
  }

  // For each entity created we need to set parents
  if (parentingRequired) {
    for (var n = 0; n < parentingRequired.length; n++) {
      var entity = parentingRequired[n][0];
      var parentEntityId = parentingRequired[n][1];
      var parentEntity = this.simulator_.getEntity(parentEntityId);
      if (!parentEntity) {
        // Entity not found
        gf.log.debug('Parent entity ' + parentEntityId + ' not found');
        return false;
      }
      entity.setParent(parentEntity);
    }
  }

  // Commands
  for (var n = 0; n < commandCount; n++) {
    // Read command type
    var commandTypeId = reader.readVarInt();
    var commandFactory = this.simulator_.getCommandFactory(commandTypeId);
    if (!commandFactory) {
      // Invalid command
      gf.log.debug('Invalid command type ' + commandTypeId + ' from server');
      return false;
    }

    // Read command data
    var command = commandFactory.allocate();
    command.read(reader);

    // Queue for processing
    this.simulator_.incomingCommandList_.addCommand(command);
  }

  return true;
}