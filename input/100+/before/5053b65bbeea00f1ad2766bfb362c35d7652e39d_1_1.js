function(set, director, world) {

        if ( set )  {
            var debugDraw = new Box2D.Dynamics.b2DebugDraw();
            var test= false;
            try {
                debugDraw.m_sprite.graphics.clear= function() {};
            } catch( e ) {}

            world.SetDebugDraw(debugDraw);

            debugDraw.SetSprite(director.ctx);
            debugDraw.SetDrawScale(CAAT.PMR);
            debugDraw.SetFillAlpha(.5);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(0x0001 | 0x0002);

        } else {
            world.setDebugDraw( null );
        }
    }