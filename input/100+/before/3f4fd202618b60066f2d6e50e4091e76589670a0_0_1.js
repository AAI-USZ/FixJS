function () {
            var superstate = this.superstate(),
                controller = this.controller(),
                owner = controller.owner(),
                transition = controller.transition(),
                origin, target, key, methodName, delegator, method, stateName;

            // If a transition is underway that involves this state, then the
            // state cannot be destroyed.
            if ( transition ) {
                origin = transition.origin();
                target = transition.target();

                if ( origin.isIn( this ) || target.isIn( this ) ) {
                    return false;
                }
            }

            // Descendant states are destroyed bottom-up.
            for ( stateName in substates ) {
                if ( O.hasOwn.call( substates, stateName ) ) {
                    substates[ stateName ].destroy();
                }
            }

            // `destroy` is the final event emitted.
            this.emit( 'destroy', false );
            for ( key in events ) {
                events[ key ].destroy();
                delete events[ key ];
            }

            // The state must remove itself from its superstate.
            if ( superstate ) {

                // A mutable superstate has a `removeSubstate` method already
                // available.
                if ( superstate.isMutable() ) {
                    superstate.removeSubstate( this.name() );
                }

                // An immutable superstate must be peeked to acquire a
                // `removeSubstate` method.
                else {
                    privileged.removeSubstate(
                        superstate.peek( __MODULE__, 'attributes' ),
                        superstate.peek( __MODULE__, 'substates' )
                    ).call( superstate, this.name() );
                }
            }

            // When the root state is destroyed, the owner gets back its
            // original methods, and the corresponding delegator for each such
            // method is destroyed.
            else {
                for ( methodName in methods ) {
                    delegator = owner[ methodName ];
                    method = delegator.original;
                    if ( method ) {
                        delete delegator.original;
                        owner[ methodName ] = method;
                    } else {
                        delete owner[ methodName ];
                    }
                }

                // The `destroy` call is propagated to the root’s controller,
                // unless the controller itself instigated the call, in which
                // case its own `destroy` method will already have been removed.
                controller.destroy && controller.destroy();
            }

            setSuperstate( undefined );

            // A flag is set that can be observed later by anything retaining a
            // reference to this state (e.g. a memoization) which would be
            // withholding it from being garbage-collected. A well-behaved
            // retaining entity should check this flag as necessary to reassert
            // the validity of its reference, and discard the reference after it
            // observes `destroyed` to have been set to `true`.
            return this.destroyed = true;
        }