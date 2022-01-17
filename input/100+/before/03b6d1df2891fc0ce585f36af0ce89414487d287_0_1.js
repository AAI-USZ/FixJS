function(fsm) {
  if (noam.fsm.determineType(fsm) !== noam.fsm.nfaType) {
    return new Error('FSM must be NFA');
  }

  var newFsm = {};

  newFsm.alphabet = noam.util.clone(fsm.alphabet);
  newFsm.states = [];
  newFsm.acceptingStates = [];
  newFsm.initialState = [noam.util.clone(fsm.initialState)];
  newFsm.transitions = [];

  for (var i=0; i<fsm.states.length; i++) {
    newFsm.states.push([noam.util.clone(fsm.states[i])]);
  }

  for (var i=0; i<fsm.acceptingStates.length; i++) {
    newFsm.acceptingStates.push([noam.util.clone(fsm.acceptingStates[i])]);
  }

  var newStates = [];
  var multiStates = [];

  for (var i=0; i<fsm.transitions.length; i++) {
    var transition = noam.util.clone(fsm.transitions[i]);
    transition.fromState = [transition.fromState];

    transition.toStates = [transition.toStates];

    if (transition.toStates[0].length > 1) {
      if (!(noam.util.containsSet(newStates, transition.toStates[0]))) {
        newStates.push(transition.toStates[0]);
      }
    }

    newFsm.transitions.push(transition);
  }

  while (newStates.length !== 0) {
    var state = newStates.pop();

    newFsm.states.push(state);

    if (noam.util.containsAny(fsm.acceptingStates, state)) {
      newFsm.acceptingStates.push(state);
    }

    for (var i=0; i<newFsm.alphabet.length; i++) {
      var ts = noam.fsm.makeTransition(fsm, state, newFsm.alphabet[i]).sort();

      for (var j=0; j<newFsm.states.length; j++) {
        if (noam.util.areEqualSets(ts, newFsm.states[j])) {
          ts = newFsm.states[j];
          break;
        }
      }
      
      for (var j=0; j<newStates.length; j++) {
        if (noam.util.areEqualSets(ts, newStates[j])) {
          ts = newStates[j];
          break;
        }
      }

      if (ts.length > 0) {
        newFsm.transitions.push({fromState : state, symbol : newFsm.alphabet[i], toStates : [ts]});
      }

      if (!(noam.util.containsSet(newFsm.states, ts)) && !(noam.util.containsSet(newStates, ts)) && ts.length > 1) {
        newStates.push(ts);
      }
    }
  }

  var errorAdded = false;
  var errorState = "ERROR";

  for (var i=0; i<newFsm.states.length; i++) {
    for (var j=0; j<newFsm.alphabet.length; j++) {
      var found = false;
      for (var k=0; k<newFsm.transitions.length; k++) {
        var transition = newFsm.transitions[k];

        if (noam.util.areEquivalent(transition.symbol, newFsm.alphabet[j]) &&
            noam.util.areEquivalent(transition.fromState, newFsm.states[i])) {
          found = true;
          break;
        }
      }

      if (found === false) {
        if (errorAdded === false) {
          newFsm.states.push([errorState]);
          errorAdded = true;
        }

        newFsm.transitions.push({fromState : newFsm.states[i], symbol : newFsm.alphabet[j], toStates : [[errorState]]});
      }
    }
  }

  return newFsm;
}