function realize ( superstate, attributes, expression ) {
    var owner, addMethod, key, method,
        self = this;

    // The real state’s private variables and collections.
    var data        = {},
        methods     = {},
        events      = {},
        guards      = {},
        substates   = {},
        transitions = {},
        history     = attributes & HISTORY || attributes & RETAINED ?
            new StateHistory( this ) :
            null;

    // Method names are mapped to specific local variables. The named
    // methods are created on `this`, each of which is a partial application
    // of its corresponding method factory at
    // [`State.privileged`](#state--privileged).
    Z.privilege( this, privileged, {
        'peek express mutate' : [ StateExpression, attributes, data,
            methods, events, guards, substates, transitions, history ],
        'superstate' : [ superstate ],
        'attributes' : [ attributes ],
        'data' : [ attributes | MUTABLE, data ],
        'method methodNames addMethod removeMethod' : [ methods ],
        'event addEvent removeEvent emit' : [ events ],
        'guard addGuard removeGuard' : [ guards ],
        'substate substates addSubstate removeSubstate' : [ attributes,
            substates ],
        'transition transitions addTransition removeTransition' :
            [ transitions ],
        'destroy' : [ function ( s ) { return superstate = s; }, methods,
            events, substates ]
    });
    history && Z.privilege( this, privileged, {
        'history push replace' : [ history ]
    });

    Z.alias( this, {
        addEvent: 'on bind',
        removeEvent: 'off unbind',
        emit: 'trigger'
    });

    // With the instance methods in place, `this` is now ready to apply
    // `expression` to itself.
    privileged.init( StateExpression ).call( this, expression );

    // Realizing a root state requires that, for any of the owner’s own
    // methods for which exist at least one stateful implementation located
    // higher in its prototype chain, that method must be copied into the
    // root to define the object’s default behavior.
    if ( !superstate && ( owner = this.owner() ) ) {
        addMethod = this.addMethod;
        if ( !addMethod ) {
            addMethod = privileged.addMethod( methods );
        }

        for ( key in owner ) if ( Z.hasOwn.call( owner, key ) ) {
            method = owner[ key ];
            Z.isFunction( method ) && !method.isDelegator &&
                this.method( key, false ) &&
                addMethod.call( this, key, method );
        }
    }

    // If the state is `finite` or non-`mutable`, then the appropriate
    // mutation methods used during construction/realization can no longer
    // be used, and must be removed.
    if ( ~attributes & MUTABLE ) {
        Z.forEach( 'mutate addMethod removeMethod addGuard removeGuard \
            addTransition removeTransition'.split(/\s+/),
            function ( m ) {
                delete self[ m ];
            });

        // An exception is `data`, which must be rewritten rather than removed.
        this.data = State.privileged.data( attributes, data );
    }
    if ( ~attributes & MUTABLE || attributes & FINITE ) {
        delete this.addSubstate;
        delete this.removeSubstate;
    }

    // Non-`mutable` and `finite` requires a special implementation of
    // `mutate` that disallows mutations to substates.
    if ( ~attributes & MUTABLE && attributes & FINITE ) {
        this.mutate = privileged.mutate( StateExpression, attributes, data,
            methods, events, guards, null, transitions );
    }

    // (Exposed for debugging.)
    Z.env.debug && Z.assign( this, {
        __private__: this.peek( __MODULE__ )
    });

    return this;
}