function (
                /*State | String*/ target,
                        /*Object*/ options // optional
            ) {
                var owner, transition, targetOwner, source, origin, domain,
                    state, record, transitionExpression,
                    self = this;

                owner = this.owner();
                transition = this.transition();

                // The `origin` is defined as the controller’s most recently
                // current state that is not a `Transition`.
                origin = transition ? transition.origin() : this.current();

                // Departures are not allowed from a state that is `final`.
                if ( origin.isFinal() ) return null;

                // Ensure that `target` is a valid [`State`](#state).
                if ( Z.isNumber( target ) ) {
                    target; // TODO: Interpret number as history traversal
                }
                target instanceof State ||
                    ( target = target ? origin.query( target ) : this.root() );
                if ( !target ||
                        ( targetOwner = target.owner() ) !== owner &&
                        !targetOwner.isPrototypeOf( owner )
                ) {
                    return null;
                }

                // Resolve `options` to an object if necessary.
                if ( !options ) {
                    options = defaultOptions;
                } else if ( Z.isArray( options ) ) {
                    options = { args: options };
                }

                // An ingressing transition that targets a retained state must
                // be redirected to whichever of that state’s internal states
                // was most recently current.
                if ( !options.direct && target.isRetained() &&
                        !target.isActive()
                ) {
                    state = target.history( 0 );
                    target = state != null && target.query( state ) || target;
                }

                // A transition cannot target an abstract state directly, so
                // `target` must be reassigned to the appropriate concrete
                // substate.
                while ( target.isAbstract() ) {
                    target = target.defaultSubstate();
                    if ( !target ) return null;
                }

                // If any guards are in place for the given `origin` and
                // `target` states, they must consent to the transition.
                if ( !options.forced && (
                        !evaluateGuard.call( origin, 'release', target ) ||
                        !evaluateGuard.call( target, 'admit', origin )
                ) ) {
                    if ( typeof options.failure === 'function' ) {
                        options.failure.call( this );
                    }
                    return null;
                }

                // If `target` is a protostate, i.e. a state from a prototype
                // of `owner`, then it must be represented within `owner` as a
                // transient virtual state that inherits from the protostate.
                target && target.controller() !== this &&
                    ( target = virtualize.call( this, target ) );

                // The `source` variable will reference the previously current
                // state (or abortive transition).
                source = this.current();

                // The upcoming transition will start from its `source` and
                // proceed within the `domain` of the least common ancestor
                // between that state and the specified target.
                domain = source.common( target );

                // Conclusivity is enforced by checking each state that will be
                // exited against the `conclusive` attribute.
                state = source;
                while ( state !== domain ) {
                    if ( state.isConclusive() ) return null;
                    state = state.superstate();
                }

                // If a previously initiated transition is still underway, it
                // needs to be notified that it won’t finish.
                transition && transition.abort();

                // Retrieve the appropriate transition expression for this
                // origin/target pairing; if none is defined, then an
                // actionless default transition will be created and applied,
                // causing the callback to return immediately.
                transitionExpression =
                    this.getTransitionExpressionFor( target, origin );
                transition =
                    new Transition( target, source, transitionExpression );
                setTransition( transition );

                // Preparation for the transition begins by emitting a `depart`
                // event on the `source` state.
                source.emit( 'depart', transition, false );
                transition.wasAborted() && ( transition = null );

                // Enter into the transition state.
                if ( transition ) {
                    setCurrent( transition );
                    transition.emit( 'enter', false );
                    transition.wasAborted() && ( transition = null );
                }

                // Walk up to the top of the domain, emitting `exit` events for
                // each state along the way.
                for ( state = source; transition && state !== domain; ) {
                    state.emit( 'exit', transition, false );
                    transition.attachTo( state = state.superstate() );
                    transition.wasAborted() && ( transition = null );
                }

                // A scoped callback will be called from `transition.end()` to
                // conclude the transition.
                transition && transition.setCallback( function () {
                    var state, pathToState, substate, superstate;

                    transition.wasAborted() && ( transition = null );

                    // Trace a path from `target` up to `domain`, then walk
                    // down it, emitting `enter` events for each state along
                    // the way.
                    if ( transition ) {
                        for ( state = target, pathToState = [];
                              state !== domain;
                              state = state.superstate()
                        ) {
                            pathToState.push( state );
                        }
                    }
                    for ( state = domain;
                        transition && ( substate = pathToState.pop() );
                        state = substate
                    ) {
                        if ( state.isShallow() && state.hasHistory() ) {
                            state.push( substate );
                        }
                        transition.attachTo( substate );
                        substate.emit( 'enter', transition, false );
                        transition.wasAborted() && ( transition = null );
                    }

                    // Exit from the transition state.
                    if ( transition ) {
                        transition.emit( 'exit', false );
                        transition.wasAborted() && ( transition = null );
                    }

                    // Terminate the transition with an `arrive` event on the
                    // targeted state.
                    if ( transition ) {
                        setCurrent( target );
                        target.emit( 'arrive', transition, false );

                        // For each state from `target` to `root` that records
                        // a deep history, push a new element that points to
                        // `target`.
                        for ( state = target; state; state = superstate ) {
                            superstate = state.superstate();
                            if ( !state.isShallow() && state.hasHistory() ) {
                                state.push( target );
                            }
                        }

                        // Any virtual states that were previously active are
                        // no longer needed.
                        for ( state = origin;
                              state.isVirtual();
                              state = superstate
                        ) {
                            superstate = state.superstate();
                            state.destroy();
                        }

                        // Now complete, the [`Transition`](#transition)
                        // instance can be discarded.
                        transition.destroy();
                        transition = setTransition( null );

                        if ( typeof options.success === 'function' ) {
                            options.success.call( this );
                        }

                        return target;
                    }

                    return null;
                });

                // At this point the transition is attached to the `domain`
                // state and is ready to proceed.
                return transition &&
                    transition.start.apply( transition, options.args ) ||
                    this.current();
            }