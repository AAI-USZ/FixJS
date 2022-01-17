function() {
        var regexTree = noamRe.array.toTree([]);
        var automaton = noamRe.tree.toAutomaton(regexTree);
        expect(noamFsm.isLanguageNonEmpty(automaton)).toBeFalsy();
      }