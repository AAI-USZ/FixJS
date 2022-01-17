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

  // Create entities
  for (var n = 0; n < createEntityCount; n++) {
    // Read entity ID, uncompress into full ID
    var entityId = reader.readVarInt() << 1;

    // Read entity info
    var entityTypeId = reader.readVarInt();
    var entityFlags = reader.readVarInt();

    // Get entity type factory
    var entityType = this.simulator_.getEntityType(entityTypeId);
    if (!entityType) {
      // Invalid entity type
      gf.log.debug('Invalid entity type ' + entityTypeId + ' from server');
      return false;
    }

    // Create entity
    var entity = entityType.createEntity(
        this.simulator_, entityId, entityFlags);

    // Load initial values
    entity.read(reader);

    // Add to simulation
    this.simulator_.addEntity(entity);

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

  // Commands
  for (var n = 0; n < commandCount; n++) {
    // Read command type
    var commandTypeId = reader.readVarInt();
    var commandType = this.simulator_.getCommandType(commandTypeId);
    if (!commandType) {
      // Invalid command
      gf.log.debug('Invalid command type ' + commandTypeId + ' from server');
      return false;
    }

    // Read command data
    var command = commandType.allocate();
    command.read(reader);

    // Queue for processing
    this.simulator_.incomingCommandList_.addCommand(command);
  }

  return true;
}