function() {
      var body, entity, md;
      if (window.game.mouse_down && !window.game.tools.MOVE.mouse_joint) {
        entity = window.game.get_entity_at_mouse();
        if (entity) {
          body = entity.fixtures[0].GetBody();
          md = new B2MouseJointDef();
          md.bodyA = window.physics.world.GetGroundBody();
          md.bodyB = body;
          md.target.Set(window.game.mouseX, window.game.mouseY);
          md.collideConnected = true;
          md.maxForce = 300.0 * body.GetMass();
          console.log(md.maxForce);
          window.game.tools.MOVE.mouse_joint = window.physics.world.CreateJoint(md);
          body.SetAwake(true);
        }
      }
      if (window.game.tools.MOVE.mouse_joint) {
        if (window.game.mouse_down) {
          return window.game.tools.MOVE.mouse_joint.SetTarget(new B2Vec2(window.game.mouseX, window.game.mouseY));
        } else {
          window.physics.world.DestroyJoint(window.game.tools.MOVE.mouse_joint);
          return window.game.tools.MOVE.mouse_joint = null;
        }
      }
    }