function(dt) {
        cp.spaceStep( this._space, dt);

        var l = this._shapesToRemove.length;

        for( var i=0; i < l; i++ ) {
            var shape = this._shapesToRemove[i];

            cc.log("removing shape: " + shape[0] + " : " + shape[1] );

            cp.spaceRemoveStaticShape( this._space, shape );
            cp.shapeFree( shape );

            var body = cp.shapeGetBody( shape );

            var sprite = cp.bodyGetUserData( body );
            sprite.removeFromParentAndCleanup(true);

            cp.bodyFree( body );

        }

        if( l > 0 )
            this._shapesToRemove = [];
    }