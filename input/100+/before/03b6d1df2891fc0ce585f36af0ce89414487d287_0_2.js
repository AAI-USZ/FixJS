function _seqToAutomaton(regex, automaton, stateCounter) {
      // Create the parts for the sequence elements and connect them via epsilon transitions.
      var l, r, statePair;
      for (var i=0; i<regex.elements.length; i++) {
        statePair = _dispatch(regex.elements[i], automaton, stateCounter);
        if (i === 0) { // this is the first element
          l = statePair[0];
        } else { // this is a later element that needs to be connected to the previous elements
          noam.fsm.addEpsilonTransition(automaton, r, [statePair[0]]);
        }
        r = statePair[1];
      }
      return [l, r];
    }