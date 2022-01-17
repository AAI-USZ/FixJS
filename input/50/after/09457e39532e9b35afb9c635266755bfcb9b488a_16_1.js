function(a, b) {
      if (a.mode != b.mode) return false;
      if (a.localState) return CodeMirror.Pass;
      return htmlMode.compareStates(a.htmlState, b.htmlState);
    }