function() {
      it("returns a tree representing the choice between the elements of its parameter", function() {
        expect(noamRe.tree.makeAlt([literal_a, literal_b]).tag).toEqual(noamRe.tree.tags.ALT);
      });

      it("represents the empty language if passed an empty array", function() {
        var regex = noamRe.tree.makeAlt([]);
        var automaton = noamRe.tree.toAutomaton(regex);
        expect(noamFsm.isLanguageNonEmpty(automaton)).toBeFalsy();
      });
    }