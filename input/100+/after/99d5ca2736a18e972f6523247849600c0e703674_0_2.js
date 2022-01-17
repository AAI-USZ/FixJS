function( contexts ) {

            //
            if ( !this.visibility() || 0 == this.alpha() ) {
                return this;
            }

            // update the animation
            this.proceed();

            // notify listeners that we're about to render
            this.trigger( "render" );

            // render to all contexts
            if ( !contexts ) {
                contexts = this.lookup( 'context' );
            }
            for ( var i = 0 ; i < contexts.length ; i ++ ) {
                contexts[ i ].save();
                render.call( this, contexts[ i ] );
            }

            // render children
            var children = this.children();
            var args = ( 0 == arguments.length ) ? [] : [ contexts ]; 
            for ( var i = 0 ; i < children.length ; i ++ ) {
                var child = children[ i ];
                child.render.apply( child, args );
            }

            for ( var i = 0 ; i < contexts.length ; i ++ ) {
                contexts[ i ].restore();
            }

            return this;

        }