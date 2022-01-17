function(path, context) {
    // 1. Normalize arguments
    // 2. Ensure that we are in the correct state
    // 3. Map provided path to context objects and send
    //    appropriate transitionEvent events

    if (Ember.empty(path)) { return; }

    var contexts = context ? Array.prototype.slice.call(arguments, 1) : [],
        currentState = get(this, 'currentState') || this,
        resolveState = currentState,
        exitStates = [],
        matchedContexts = [],
        cachedPath,
        enterStates,
        state,
        initialState,
        stateIdx,
        useContext;

    if (!context && (cachedPath = currentState.pathsCacheNoContext[path])) {
      // fast path

      exitStates = cachedPath.exitStates;
      enterStates = cachedPath.enterStates;
      resolveState = cachedPath.resolveState;
    } else {
      // normal path

      if ((cachedPath = currentState.pathsCache[path])) {
        // cache hit

        exitStates = cachedPath.exitStates;
        enterStates = cachedPath.enterStates;
        resolveState = cachedPath.resolveState;
      } else {
        // cache miss

        enterStates = this.findStatesByPath(currentState, path);

        while (resolveState && !enterStates) {
          exitStates.unshift(resolveState);

          resolveState = get(resolveState, 'parentState');
          if (!resolveState) {
            enterStates = this.findStatesByPath(this, path);
            if (!enterStates) {
              Ember.assert('Could not find state for path: "'+path+'"');
              return;
            }
          }
          enterStates = this.findStatesByPath(resolveState, path);
        }

        while (enterStates.length > 0 && enterStates[0] === exitStates[0]) {
          resolveState = enterStates.shift();
          exitStates.shift();
        }

        currentState.pathsCache[path] = {
          exitStates: exitStates,
          enterStates: enterStates,
          resolveState: resolveState
        };
      }

      // Don't modify the cached versions
      enterStates = enterStates.slice();
      exitStates = exitStates.slice();

      stateIdx = enterStates.length-1;
      while (contexts.length > 0) {
        if (stateIdx >= 0) {
          state = enterStates[stateIdx--];
        } else {
          state = enterStates[0] ? get(enterStates[0], 'parentState') : resolveState;
          if (!state) { throw "Cannot match all contexts to states"; }
          enterStates.unshift(state);
          exitStates.unshift(state);
        }

        useContext = context && get(state, 'hasContext');
        matchedContexts.unshift(useContext ? contexts.pop() : null);
      }

      state = enterStates[enterStates.length - 1] || resolveState;
      while(true) {
        initialState = get(state, 'initialState') || 'start';
        state = get(state, 'states.'+initialState);
        if (!state) { break; }
        enterStates.push(state);
        matchedContexts.push(undefined);
      }

      while (enterStates.length > 0) {
        if (enterStates[0] !== exitStates[0]) { break; }

        if (enterStates.length === matchedContexts.length) {
          if (this.getStateMeta(enterStates[0], 'context') !== matchedContexts[0]) { break; }
          matchedContexts.shift();
        }

        resolveState = enterStates.shift();
        exitStates.shift();
      }
    }

    this.enterState(exitStates, enterStates, enterStates[enterStates.length-1] || resolveState);
    this.triggerSetupContext(enterStates, matchedContexts);
  }