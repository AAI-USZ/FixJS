function accessor ( input ) {
            var current, match, method;

            if ( this === owner ) {
                current = self.current();
                if ( arguments.length === 0 ) return current;
                if ( typeof input === 'function' ) {
                    return current.change( input.call( this ) );
                }
                if ( typeof input === 'string' &&
                    ( match = input.match( rxTransitionArrow ) ) &&
                    ( method = transitionArrowMethods[ match[1] ] )
                ) {
                    if ( arguments.length > 1 ) {
                        return current[ method ].apply( current, [ match[2] ]
                            .concat( Z.slice.call( arguments, 1 ) ) );
                    } else return current[ method ]( match[2] );
                }
                return current.query.apply( current, arguments );
            }

            // Calling the accessor of a prototype means that `this` requires
            // its own accessor and [`StateController`](#state-controller).
            // Creating a new `StateController` has the desired side-effect of
            // also creating the object’s new accessor, to which the call is
            // then forwarded.
            else if (
                Object.prototype.isPrototypeOf.call( owner, this ) &&
                !Z.hasOwn.call( this, name )
            ) {
                new StateController( this, null, {
                    name: name,
                    initialState: self.current().toString()
                });
                return this[ name ].apply( this, arguments );
            }
        }