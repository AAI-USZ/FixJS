function( event ) {
        if( this.owner.hasComponent( "Controller" ) ) {
          var controller = this.owner.findComponent( "Controller" );
          var transform = space.findNamed( "tank-body" ).findComponent( "Transform" );
          if( controller.states["MoveForward"] ) {
            console.log( this.owner.id, "Move forward!" );
            var direction = math.transform.translate( [space.clock.delta * 0.001, 0, 0] );
            var rotation = math.transform.rotate( transform.rotation.buffer );
            direction = math.matrix4.multiply( rotation, direction );
            direction = [direction[12], direction[13], direction[14]];
            transform.position = math.vector3.add( direction, transform.position );
          }
          if( controller.states["MoveBackward"] ) {
            console.log( this.owner.id, "Move backward!" );            
            var direction = math.transform.translate( [space.clock.delta * -0.001, 0, 0] );
            var rotation = math.transform.rotate( transform.rotation.buffer );
            direction = math.matrix4.multiply( [direction, rotation] );
            direction = [direction[12], direction[13], direction[14]];
            transform.position = math.vector3.add( direction, transform.position );
          }
          if( controller.states["TurnLeft"] ) {
            if( controller.states["StrafeModifier"] ) {
              console.log( this.owner.id, "Strafe left!" );
              var direction = math.transform.translate( [0, space.clock.delta * -0.001, 0] );
              var rotation = math.transform.rotate( transform.rotation.buffer );
              direction = math.matrix4.multiply( [direction, rotation] );
              direction = [direction[12], direction[13], direction[14]];
              transform.position = math.vector3.add( direction, transform.position );
            } else {
              console.log( this.owner.id, "Turn left!" );
              var rotation = transform.rotation;
              transform.rotation = math.vector3.add( rotation, [0, 0, space.clock.delta * -0.001] );
            }
          }
          if( controller.states["TurnRight"] ) {
            if( controller.states["StrafeModifier"] ) {
              console.log( this.owner.id, "Strafe right!" );
              var direction = math.transform.translate( [0, space.clock.delta * 0.001, 0] );
              var rotation = math.transform.rotate( transform.rotation );
              direction = math.matrix4.multiply( [direction, rotation] );
              direction = [direction[12], direction[13], direction[14]];
              transform.position = math.vector3.add( direction, transform.position );
            } else {
              console.log( this.owner.id, "Turn right!" );
              var rotation = transform.rotation;
              transform.rotation = math.vector3.add( rotation, [0, 0, space.clock.delta * 0.001] );
            }
          }
        }
      }