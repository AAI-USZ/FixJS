function onUpdate( event ) {
    var position2 = this.box2dBody.GetPosition();
    var angle2 = this.box2dBody.GetAngle();

    // TD: This will cause the transform to emit an event that we handle below. Blech!
    var transform = this.owner.findComponent( "Transform" );
    transform.position = [ position2.get_x(), position2.get_y(), transform.position.z ];
    transform.rotation = [ transform.rotation.x, transform.rotation.y, angle2 ];
  }