function(eventSet, datamodelForNextStep) {

        if (printTrace) platform.log("selecting transitions with eventSet: ", eventSet);

        var selectedTransitions = this._selectTransitions(eventSet, datamodelForNextStep);

        if (printTrace) platform.log("selected transitions: ", selectedTransitions);

        if (!selectedTransitions.isEmpty()) {

            if (printTrace) platform.log("sorted transitions: ", selectedTransitions);

            //we only want to enter and exit states from transitions with targets
            //filter out targetless transitions here - we will only use these to execute transition actions
            var selectedTransitionsWithTargets = new this.opts.TransitionSet(selectedTransitions.iter().filter(function(t){return t.targets;}));

            var exitedTuple = this._getStatesExited(selectedTransitionsWithTargets), 
                basicStatesExited = exitedTuple[0], 
                statesExited = exitedTuple[1];

            var enteredTuple = this._getStatesEntered(selectedTransitionsWithTargets), 
                basicStatesEntered = enteredTuple[0], 
                statesEntered = enteredTuple[1];

            if (printTrace) platform.log("basicStatesExited ", basicStatesExited);
            if (printTrace) platform.log("basicStatesEntered ", basicStatesEntered);
            if (printTrace) platform.log("statesExited ", statesExited);
            if (printTrace) platform.log("statesEntered ", statesEntered);

            var eventsToAddToInnerQueue = new this.opts.EventSet();

            //update history states
            if (printTrace) platform.log("executing state exit actions");

            statesExited.forEach(function(state){

                if (printTrace) platform.log("exiting ", state);

                //invoke listeners
                this._listeners.forEach(function(l){
                   if(l.onExit) l.onExit(state.id); 
                });

                state.onexit.forEach(function(action){
                    this._evaluateAction(action, eventSet, datamodelForNextStep, eventsToAddToInnerQueue);
                },this);

                var f;
                if (state.history) {
                    if (state.history.isDeep) {
                        f = function(s0) {
                            return s0.kind === stateKinds.BASIC && state.descendants.indexOf(s0) > -1;
                        };
                    } else {
                        f = function(s0) {
                            return s0.parent === state;
                        };
                    }
                    //update history
                    this._historyValue[state.history.id] = statesExited.filter(f);
                }
            },this);


            // -> Concurrency: Number of transitions: Multiple
            // -> Concurrency: Order of transitions: Explicitly defined
            var sortedTransitions = selectedTransitions.iter().sort(function(t1, t2) {
                return t1.documentOrder - t2.documentOrder;
            });

            if (printTrace) platform.log("executing transitition actions");


            sortedTransitions.forEach(function(transition){

                var targetIds = transition.targets && transition.targets.map(function(target){return target.id;});

                this._listeners.forEach(function(l){
                   if(l.onTransition) l.onTransition(transition.source.id,targetIds); 
                });

                transition.actions.forEach(function(action){
                    this._evaluateAction(action, eventSet, datamodelForNextStep, eventsToAddToInnerQueue);
                },this);
            },this);
 
            if (printTrace) platform.log("executing state enter actions");

            statesEntered.forEach(function(state){

                this._listeners.forEach(function(l){
                   if(l.onEntry) l.onEntry(state.id); 
                });

                state.onentry.forEach(function(action){
                    this._evaluateAction(action, eventSet, datamodelForNextStep, eventsToAddToInnerQueue);
                },this);
            },this);

            if (printTrace) platform.log("updating configuration ");
            if (printTrace) platform.log("old configuration ", this._configuration);

            //update configuration by removing basic states exited, and adding basic states entered
            this._configuration.difference(basicStatesExited);
            this._configuration.union(basicStatesEntered);

            if (printTrace) platform.log("new configuration ", this._configuration);
            
            //add set of generated events to the innerEventQueue -> Event Lifelines: Next small-step
            if (!eventsToAddToInnerQueue.isEmpty()) {
                if (printTrace) platform.log("adding triggered events to inner queue ", eventsToAddToInnerQueue);
                this._innerEventQueue.push(eventsToAddToInnerQueue);
            }

            if (printTrace) platform.log("updating datamodel for next small step :");
            
            //update the datamodel
            for (var key in datamodelForNextStep) {
                this._datamodel[key].set(datamodelForNextStep[key]);
            }
        }

        //if selectedTransitions is empty, we have reached a stable state, and the big-step will stop, otherwise will continue -> Maximality: Take-Many
        return selectedTransitions;
    }