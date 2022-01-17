function(fsm) {
  if (noam.fsm.determineType(fsm) !== noam.fsm.enfaType) {
    return fsm; // this is already an NFA (or a DFA which is also an NFA)
  }

  var newFsm = noam.util.clone(fsm);

  var initialEpsilon = noam.fsm.computeEpsilonClosure(fsm, [fsm.initialState]);

  if (noam.util.containsAny(newFsm.acceptingStates, initialEpsilon) &&
      !(noam.util.contains(newFsm.acceptingStates, newFsm.initialState))) {
    newFsm.acceptingStates.push(newFsm.initialState);
  }

  var newTransitions = [];

  for (var i=0; i<newFsm.states.length; i++) {
    for (var j=0; j<newFsm.alphabet.length; j++) {
      var toStates = noam.fsm.makeTransition(newFsm, [newFsm.states[i]], newFsm.alphabet[j]).sort();

      if (toStates.length > 0) {
        newTransitions.push({
          fromState : newFsm.states[i],
          toStates : toStates,
          symbol : newFsm.alphabet[j]
        });
      }
    }
  }

  newFsm.transitions = newTransitions;

  var multiStateTransitions = [];

  for (var i=0; i<newFsm.transitions.length; i++) {
    var transition = newFsm.transitions[i];

    if (transition.toStates.length > 1) {
      var existing = false;

      for (var j=0; j<multiStateTransitions.length; j++) {
        if (noam.util.areEqualSets(transition.toStates, multiStateTransitions[j])) {
          transition.toStates = multiStateTransitions[j];
          existing = true;
          break;
        }
      }

      if (existing === false) {
        multiStateTransitions.push(transition.toStates);
      }
    }
  }

  return newFsm;
}