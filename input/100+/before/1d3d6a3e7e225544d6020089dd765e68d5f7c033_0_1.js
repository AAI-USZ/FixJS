function resolve() {
    var component;

    //Defining space here and then pulling the space from one of the components
    //because we do not currently have the ability to have multiple worlds.
    //Once we do each world will have a specific space
    var space;

    var registeredComponents = this._registeredComponents;

    //Go through the list of registered components,
    // add up all the global forces into gravity,
    // and then set the gravity on the world
    // TODO: Make sure that we transform each force according to the transforms of whatever parent objects it has
    var totalForce = new math.Vector2();
    var entityId;
    for (entityId in registeredComponents["Force"]){
      math.vector2.add(totalForce, registeredComponents["Force"][entityId].force, totalForce);
    }

    this.gravity.Set(totalForce.x, totalForce.y);

    this.world.SetGravity(this.gravity);
    // Update all physics components
    var updateEvent = new Event( 'Update', undefined, false );
    for( var componentType in registeredComponents ) {
      for( entityId in registeredComponents[componentType] ) {
        component = registeredComponents[componentType][entityId];
        space = component.owner.space;
        while( component.handleQueuedEvent() ) {}
        updateEvent.dispatch( component );
      }
    }

    // Box2D steps in seconds
    this._timeRemaining += space.clock.delta;
    while( this._timeRemaining >= this._timeStep ) {
      this.world.Step( this._timeStep/1000, 2, 2 );
      this._timeRemaining -= this._timeStep;
    }
  }