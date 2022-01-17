function() {
        var eps = noamRe.tree.makeEps();
        var automaton = noamRe.tree.toAutomaton(eps);
        expect(noamFsm.isStringInLanguage(automaton, [])).toBeTruthy();
        expect(noamFsm.isStringInLanguage(automaton, ["a"])).toBeFalsy();
      }